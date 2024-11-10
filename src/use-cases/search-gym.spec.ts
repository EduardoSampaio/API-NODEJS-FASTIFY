import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkin-repository';
import { expect, describe, it, beforeEach } from 'vitest'
import { FechUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history.usecase';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository';
import { SearchGymsUseCase } from './search-gyms.usecase';

describe('Fetch Check-in History Use Case', () => {

    let repository: InMemoryGymsRepository;
    let sut: SearchGymsUseCase;

    beforeEach(() => {
        repository = new InMemoryGymsRepository();
        sut = new SearchGymsUseCase(repository);

    })

    it('should be able to fetch pagined check-in history', async () => {

        // for (let i = 1; i <= 22; i++) {
        //     await repository.create({
        //         gym_id: `gym-${i}`,
        //         user_id: 'user-01'
        //     });
        // }


        // const { checkIns } = await sut.execute({
        //     userId: 'user-01',
        //     page: 1
        // })

        expect(checkIns).toHaveLength(20);
    })
})