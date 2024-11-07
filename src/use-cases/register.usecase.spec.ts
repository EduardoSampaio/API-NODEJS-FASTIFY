import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { compare } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register.usecase';
import { UserAlreadExistError } from '@/errors/user-already-exists';


describe('Register Use Case', () => {

    let repository: InMemoryUserRepository;
    let sut: RegisterUseCase;

    beforeEach(() => {
        repository = new InMemoryUserRepository();
        sut = new RegisterUseCase(repository)
    })

    it('should be able to register', async () => {
        const user = await sut.execute({
            name: 'John Doe',
            email: 'KX7Jt@example.com',
            password: '123456'
        }).then(res => res.user)

        expect(user.id).toEqual(expect.any(String))
    })


    it('should hash user password up registration', async () => {
        const user = await sut.execute({
            name: 'John Doe',
            email: 'KX7Jt@example.com',
            password: '123456'
        }).then(res => res.user)

        const isPasswordHashed = await compare('123456', user.password_hash)
        expect(isPasswordHashed).toBe(true)
    })

    it('should not be able to register with same email', async () => {

        const email = 'KX7Jt@example.com'
        await sut.execute({
            name: 'John Doe',
            email,
            password: '123456'
        })

        await expect(() =>
            sut.execute({
                name: 'John Doe',
                email,
                password: '123456'
            }),
        ).rejects.toBeInstanceOf(UserAlreadExistError)
    })
})