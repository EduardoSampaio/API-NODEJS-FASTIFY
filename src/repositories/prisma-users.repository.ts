import { Prisma, User } from '@prisma/client';
import { prisma } from "@/lib/prisma"
import { UserRepository } from './users.repository';

export class PrismaUserRepository implements UserRepository {
    create(data: Prisma.UserCreateInput): Promise<User> {
        return prisma.user.create({ data })
    }

    findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({ where: { email } })
    }
}