import { InMemoryUserRepository } from '@/repositories/in-memory-users-repository';
import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs';
import { GetUserProfileUseCase } from './get-user-profile.usecase';
import { ResourceNotFoundError } from '@/errors/resource-not-found-error';


describe('Get User Profile Use Case', () => {

    let repository: InMemoryUserRepository;
    let sut: GetUserProfileUseCase;

    beforeEach(async () => {
        repository = new InMemoryUserRepository();
        sut = new GetUserProfileUseCase(repository)
        await repository.create({ id: 'id-test', name: 'John Doe', email: 'KX7Jt@example.com', password_hash: await hash('123456', 6) })
    })

    it('should be able to get user profile', async () => {
        const user = await sut.execute({
            userId: 'id-test'
        }).then(res => res.user)

        expect(user.id).toEqual('id-test')
    })


    it('should not be able to get user profile', async () => {
        expect(() => sut.execute({
            userId: 'not-id-test'
        }).then(res => res.user)).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})