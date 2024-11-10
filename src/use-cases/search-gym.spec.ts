import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository';
import { SearchGymsUseCase } from './search-gyms.usecase';

describe('Should be able to search gyms', () => {

    let repository: InMemoryGymsRepository;
    let sut: SearchGymsUseCase;

    beforeEach(() => {
        repository = new InMemoryGymsRepository();
        sut = new SearchGymsUseCase(repository);

    })

    it('should be able to search gyms by query', async () => {
        await repository.create({ title: 'JavaScript Gym', description: '', phone: null, latitude: -27.2092052, longitude: -49.6401091 });
        await repository.create({ title: 'TypeScript Gym', description: '', phone: null, latitude: -27.2092052, longitude: -49.6401091 });

        const { gyms } = await sut.execute({ query: 'JavaScript', page: 1 });

        expect(gyms).toHaveLength(1);
        expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript Gym' })])
    })


    it('should be able to search paginated gyms', async () => {

        for (let i = 1; i <= 22; i++) {
            await repository.create({ title: `JavaScript Gym ${i}`, description: '', phone: null, latitude: -27.2092052, longitude: -49.6401091 });
        }


        const { gyms } = await sut.execute({ query: 'JavaScript', page: 2 });

        expect(gyms).toHaveLength(2);
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'JavaScript Gym 21' }),
            expect.objectContaining({ title: 'JavaScript Gym 22' })
        ])
    })
})