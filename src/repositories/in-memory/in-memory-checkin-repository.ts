import { CheckIn, Prisma } from '@prisma/client';
import { CheckInRepository } from '../intefaces/checks-ins-repository';
import { randomUUID } from 'node:crypto';
import dayjs from 'dayjs';

export class InMemoryCheckInRepository implements CheckInRepository {

    public checkins: CheckIn[] = [];

    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn: CheckIn = {
            id: randomUUID(),
            validatedAt: data.validatedAt ? new Date(data.validatedAt) : null,
            createdAt: new Date(),
            gym_id: data.gym_id,
            user_id: data.user_id
        };

        this.checkins.push(checkIn);
        return checkIn;
    }

    async findByUserIdOnDate(userId: string, date: Date) {
        const startOfTheDay = dayjs(date).startOf('date');
        const endOfTheDay = dayjs(date).endOf('date');

        const checkInONSameDate = this.checkins.find(checkIn =>
            checkIn.user_id === userId
            && dayjs(checkIn.createdAt).isAfter(startOfTheDay)
            && dayjs(checkIn.createdAt).isBefore(endOfTheDay)
        )

        if (!checkInONSameDate) {
            return null;
        }

        return checkInONSameDate;
    }

    async findManyByUserId(userId: string, page: number) {
        return this.checkins.filter(checkIn => checkIn.user_id === userId)
            .slice((page - 1) * 20, page * 20);
    }

    async countByUserId(userId: string) {
        return this.checkins.filter(checkIn => checkIn.user_id === userId).length;
    }

    async findById(id: string) {
        const checkIn = this.checkins.find((item) => item.id === id)

        if (!checkIn) {
            return null
        }

        return checkIn
    }

    async save(checkIn: CheckIn) {
        const checkInIndex = this.checkins.findIndex((item) => item.id === checkIn.id)

        if (checkInIndex >= 0) {
            this.checkins[checkInIndex] = checkIn
        }

        return checkIn
    }
} 