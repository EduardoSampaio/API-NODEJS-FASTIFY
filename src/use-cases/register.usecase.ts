import { hash } from "bcryptjs";
import { UserRepository } from '@/repositories/users.repository';
import { UserAlreadExistError } from "@/errors/user-already-exists";

interface RegisterUseCaseRequest {
    name: string
    email: string
    password: string
}

export class RegisterUseCase {

    constructor(private usersRepository: UserRepository) { }

    async execute({ name, email, password }: RegisterUseCaseRequest) {
        const password_hash = await hash(password, 6);

        const userWithSameEmail = this.usersRepository.findByEmail(email)

        if (userWithSameEmail === null) {
            throw new UserAlreadExistError()
        }

        await this.usersRepository.create({ name, email, password_hash });
    }
}

