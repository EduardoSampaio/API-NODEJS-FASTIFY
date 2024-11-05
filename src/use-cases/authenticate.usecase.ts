import { InvalidCredentialsError } from '@/errors/invalid-credentials-error';
import { UserRepository } from '@/repositories/users.repository';
import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';

interface AuthenticateUseCaseRequest {
    email: string;
    password: string;
}

interface AuthenticateUseCaseResponse {
    user: User
}

export class AuthenticateUseCase {

    constructor(private UserRepository: UserRepository) { }

    async execute({ email, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        const user = await this.UserRepository.findByEmail(email);
        if (!user) {
            throw new InvalidCredentialsError();
        }

        const doesPasswordMatches = await bcrypt.compare(password, user.password_hash);
        if (!doesPasswordMatches) {
            throw new InvalidCredentialsError();
        }

        return {
            user
        }
    }

}