import { ResourceNotFoundError } from '@/errors/resource-not-found-error';
import { UserRepository } from '@/repositories/users.repository';
import { User } from '@prisma/client';

interface GetUserProfileUseCaseRequest {
    userId: string;
}

interface GetUserProfileUseCaseResponse {
    user: User
}

export class GetUserProfileUseCase {

    constructor(private UserRepository: UserRepository) { }

    async execute({ userId }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
        const user = await this.UserRepository.findbyId(userId);
        if (!user) {
            throw new ResourceNotFoundError();
        }

        return {
            user
        }
    }

}