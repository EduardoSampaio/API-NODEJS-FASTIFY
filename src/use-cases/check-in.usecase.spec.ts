import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkin-repository';
import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { CheckInUseCase } from './checkin.usecase';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository';
import { Decimal } from '@prisma/client/runtime/library';
import { MaxDistanceError } from '@/errors/max-distance-error';
import { MaxNumberOfCheckInsError } from '@/errors/max-number-of-check-ins-error';

describe('Check-in Use Case', () => {

    let checkInRepository: InMemoryCheckInRepository;
    let gymRepository: InMemoryGymsRepository;
    let sut: CheckInUseCase;

    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository();
        gymRepository = new InMemoryGymsRepository();
        sut = new CheckInUseCase(checkInRepository, gymRepository);

        gymRepository.gyms.push({
            id: 'gym-01',
            title: 'JavaScript Gym',
            description: '',
            latitude: new Decimal(0),
            longitude: new Decimal(0),
            phone: null
        })


        vi.useFakeTimers();
    })

    afterEach(() => {
        vi.useRealTimers();
    })

    it('should be able to create check in', async () => {
        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0,
        })

        expect(checkIn.user_id).toEqual(expect.any(String))
        expect(checkIn.gym_id).toEqual(expect.any(String))
    })


    it('should not be able to check in twice  in the same day', async () => {
        vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0,
        })

        await expect(() => sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0,
        })).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
    })


    it('should be able to check in twice but in diferent days', async () => {
        vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0,
        })

        vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0))

        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0,
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })


    it('should not be able to create check in on distant gym', async () => {
        gymRepository.gyms.push({
            id: 'gym-02',
            title: 'JavaScript Gym',
            description: '',
            latitude: new Decimal(-27.0747279),
            longitude: new Decimal(-49.4889672),
            phone: null
        })

        await expect(() => sut.execute({
            gymId: 'gym-02',
            userId: 'user-01',
            userLatitude: -27.2092052,
            userLongitude: -49.6401091,
        })).rejects.toBeInstanceOf(MaxDistanceError)
    })

})