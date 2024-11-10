import { LateCheckInValidationError } from '@/errors/late-check-in-validation-error';
import { ResourceNotFoundError } from '@/errors/resource-not-found-error';
import { CheckInRepository } from '@/repositories/intefaces/checks-ins-repository';
import { CheckIn } from '@prisma/client'
import dayjs from 'dayjs'

interface ValidateCheckInUseCaseRequest {
    checkInId: string
}

interface ValidateCheckInUseCaseResponse {
    checkIn: CheckIn
}

export class ValidateCheckInUseCase {
    constructor(private checkInsRepository: CheckInRepository) { }

    async execute({
        checkInId,
    }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
        const checkIn = await this.checkInsRepository.findById(checkInId);

        if (!checkIn) {
            throw new ResourceNotFoundError()
        }

        const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
            checkIn.createdAt,
            'minutes',
        )

        if (distanceInMinutesFromCheckInCreation > 20) {
            throw new LateCheckInValidationError()
        }

        checkIn.validatedAt = new Date()

        await this.checkInsRepository.save(checkIn)

        return {
            checkIn,
        }
    }
}