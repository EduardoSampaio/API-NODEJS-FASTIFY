import { CheckInRepository } from './../repositories/intefaces/checks-ins-repository';
import { CheckIn } from '@prisma/client';


interface FetchUserCheckInsHistoryUseCaseRequest {
    userId: string
    page: number
}

interface FetchUserCheckInsHistoryUseCaseResponse {
    checkIns: CheckIn[]
}

export class FechUserCheckInsHistoryUseCase {

    constructor(private checkInRepository: CheckInRepository) { }

    async execute({ userId, page }: FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
        const checkIns = await this.checkInRepository.findManyByUserId(userId, page);

        return {
            checkIns
        };
    }
}

