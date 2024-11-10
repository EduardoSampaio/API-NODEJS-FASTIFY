import { GymsRepository } from '@/repositories/intefaces/gym-repository';
import { Gym } from '@prisma/client';

interface SearchGymsUseCaseRequest {
    query: string,
    page: number,
}

interface SearchGymsUseCaseResponse {
    gyms: Gym[]
}

export class SearchGymsUseCase {

    constructor(private gymRepository: GymsRepository) { }


    async execute({ query, page }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {
        const gyms = await this.gymRepository.searchMany(query, page);

        return { gyms };
    }
}

