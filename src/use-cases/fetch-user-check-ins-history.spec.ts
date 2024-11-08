import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkin-repository';
import { expect, describe, it, beforeEach } from 'vitest'
import { FechUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history.usecase';

describe('Fetch Check-in History Use Case', () => {

    let checkInRepository: InMemoryCheckInRepository;
    let sut: FechUserCheckInsHistoryUseCase;

    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository();
        sut = new FechUserCheckInsHistoryUseCase(checkInRepository);

    })

    it('should be able to fetch check-in history', async () => {

        await checkInRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        });

        await checkInRepository.create({
            gym_id: 'gym-02',
            user_id: 'user-01'
        });

        const { checkIns } = await sut.execute({
            userId: 'user-01',
        })

        expect(checkIns).toHaveLength(2);
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gym-01' }),
            expect.objectContaining({ gym_id: 'gym-02' }),
        ])
    })

    it('should be able to fetch pagined check-in history', async () => {

        for (let i = 1; i <= 22; i++) {
            await checkInRepository.create({
                gym_id: `gym-${i}`,
                user_id: 'user-01'
            });
        }


        const { checkIns } = await sut.execute({
            userId: 'user-01',
        })

        expect(checkIns).toHaveLength(2);
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gym-01' }),
            expect.objectContaining({ gym_id: 'gym-02' }),
        ])
    })
})