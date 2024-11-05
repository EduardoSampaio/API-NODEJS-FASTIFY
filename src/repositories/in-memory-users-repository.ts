import { UserRepository } from '@/repositories/users.repository';
import { Prisma, User } from '@prisma/client';

export class InMemoryUserRepository implements UserRepository {

    public users: User[] = [];

    create(data: Prisma.UserCreateInput): Promise<User> {
        const user: User = {
            id: 'id-test',
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            createdAt: new Date(),
        };

        this.users.push(user);
        return new Promise(resolve => resolve(user));
    }
    findByEmail(email: string): Promise<User | null> {
        const user = this.users.find(user => user.email === email);

        if (!user) {
            return new Promise(resolve => resolve(null));
        }

        return new Promise(resolve => resolve(user));
    }

    findbyId(id: string): Promise<User | null> {
        const user = this.users.find(user => user.id === id);

        if (!user) {
            return new Promise(resolve => resolve(null));
        }

        return new Promise(resolve => resolve(user));
    }

}