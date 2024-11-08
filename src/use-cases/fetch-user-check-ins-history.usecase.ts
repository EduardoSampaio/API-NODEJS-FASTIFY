import { CheckInRepository } from './../repositories/intefaces/checks-ins-repository';
import { CheckIn } from '@prisma/client';


interface FetchUserCheckInsHistoryUseCaseRequest {
    userId: string
}

interface FetchUserCheckInsHistoryUseCaseResponse {
    checkIns: CheckIn[]
}

export class FechUserCheckInsHistoryUseCase {

    constructor(private checkInRepository: CheckInRepository) { }

    async execute({ userId }: FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
        const checkIns = await this.checkInRepository.findManyByUserId(userId);

        return {
            checkIns
        };
    }
}

