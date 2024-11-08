import { GymsRepository } from './../repositories/intefaces/gym-repository';
import { CheckInRepository } from './../repositories/intefaces/checks-ins-repository';
import { CheckIn } from '@prisma/client';
import { ResourceNotFoundError } from '@/errors/resource-not-found-error';
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates';
import { MaxDistanceError } from '@/errors/max-distance-error';
import { MaxNumberOfCheckInsError } from '@/errors/max-number-of-check-ins-error';

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

    async execute({ userId, gymId, userLatitude, userLongitude }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
        const gym = await this.gymsRepository.findbyId(gymId);

        if (!gym) {
            throw new ResourceNotFoundError();
        }

        const distance = getDistanceBetweenCoordinates(
            { latitude: userLatitude, longitude: userLongitude },
            { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
        )

        const MAX_DISTANCE_IN_KM = 0.1;

        if (distance > MAX_DISTANCE_IN_KM) {
            throw new MaxDistanceError();
        }

        const checkInOnSameDate = await this.checkInRepository.findByUserIdOnDate(userId, new Date())

        if (checkInOnSameDate) {
            throw new MaxNumberOfCheckInsError();
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