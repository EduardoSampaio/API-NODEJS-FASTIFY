import { GymsRepository } from './../repositories/intefaces/gym-repository';
import { CheckInRepository } from './../repositories/intefaces/checks-ins-repository';
import { CheckIn } from '@prisma/client';
import { ResourceNotFoundError } from '@/errors/resource-not-found-error';

interface CheckInUseCaseRequest {
    userId: string;
    gymId: string;
    userLatitude: number;
    userLongitude: number;
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn
}

export class CheckInUseCase {

    constructor(private checkInRepository: CheckInRepository,
        private gymsRepository: GymsRepository
    ) { }

    async execute({ userId, gymId }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
        const gym = await this.gymsRepository.findbyId(gymId);

        if (!gym) {
            throw new ResourceNotFoundError();
        }

        const checkInOnSameDate = await this.checkInRepository.findByUserIdOnDate(userId, new Date())

        if (checkInOnSameDate) {
            throw Error();
        }

        const checkIn = await this.checkInRepository.create({
            user_id: userId,
            gym_id: gymId
        })

        return {
            checkIn
        }
    }

}