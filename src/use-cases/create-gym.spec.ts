import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository';
import { CreateGymUseCase } from './create-gym.usecase';


describe('Create Gym Use Case', () => {

    let repository: InMemoryGymsRepository;
    let sut: CreateGymUseCase;

    beforeEach(() => {
        repository = new InMemoryGymsRepository();
        sut = new CreateGymUseCase(repository)
    })

    it('should be able to register', async () => {
        const { gym } = await sut.execute({
            title: 'JavaScript Gym',
            description: '',
            phone: null,
            latitude: -27.2092052,
            longitude: -49.6401091
        })

        expect(gym.id).toEqual(expect.any(String))
    })

})