import bcrypt from "bcryptjs";
import { UserRepository } from '@/repositories/intefaces/users.repository';
import { UserAlreadExistError } from "@/errors/user-already-exists";
import { User } from '@prisma/client';

interface RegisterUseCaseRequest {
    name: string
    email: string
    password: string
}

interface RegisterUseCaseResponse {
    user: User
}

export class RegisterUseCase {

    constructor(private usersRepository: UserRepository) { }

    async execute({ name, email, password }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
        const password_hash = await bcrypt.hash(password, 6);

        const userWithSameEmail = await this.usersRepository.findByEmail(email)
        if (userWithSameEmail !== null) {
            throw new UserAlreadExistError();
        }

        const user = await this.usersRepository.create({ name, email, password_hash });
        return { user }
    }
}

