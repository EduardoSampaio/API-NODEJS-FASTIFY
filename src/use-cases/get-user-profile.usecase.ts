import { ResourceNotFoundError } from '@/errors/resource-not-found-error';
import { UserRepository } from '@/repositories/intefaces/users.repository';
import { User } from '@prisma/client';

interface GetUserProfileUseCaseRequest {
    userId: string;
}

interface GetUserProfileUseCaseResponse {
    user: User
}

export class GetUserProfileUseCase {

    constructor(private userRepository: UserRepository) { }

    async execute({ userId }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
        const user = await this.userRepository.findbyId(userId);
        if (!user) {
            throw new ResourceNotFoundError();
        }

        return {
            user
        }
    }

}