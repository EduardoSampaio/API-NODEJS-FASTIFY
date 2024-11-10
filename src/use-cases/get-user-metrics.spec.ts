import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkin-repository';
import { expect, describe, it, beforeEach } from 'vitest'
import { GetUserMetricsUseCase } from './get-user-metrics.usecase';

describe('Get User Metrics Use Case', () => {

    let checkInRepository: InMemoryCheckInRepository;
    let sut: GetUserMetricsUseCase;

    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository();
        sut = new GetUserMetricsUseCase(checkInRepository);

    })

    it('should be able to get user check-ins count metrics', async () => {

        await checkInRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        });

        await checkInRepository.create({
            gym_id: 'gym-02',
            user_id: 'user-01'
        });

        const { checkInsCount } = await sut.execute({
            userId: 'user-01',
        })

        expect(checkInsCount).toEqual(2);
    })

})