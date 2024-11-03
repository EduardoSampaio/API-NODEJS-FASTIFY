import { InMemoryUserRepository } from '@/repositories/in-memory-users-repository';
import { compare } from 'bcryptjs'
import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register.usecase';
import { UserAlreadExistError } from '@/errors/user-already-exists';


describe('Register Use Case', () => {

    it('should be able to register', async () => {

        const repository = new InMemoryUserRepository();
        const registerUserCase = new RegisterUseCase(repository)

        const user = await registerUserCase.execute({
            name: 'John Doe',
            email: 'KX7Jt@example.com',
            password: '123456'
        }).then(res => res.user)

        expect(user.id).toEqual(expect.any(String))
    })


    it('should hash user password up registration', async () => {

        const repository = new InMemoryUserRepository();
        const registerUserCase = new RegisterUseCase(repository)

        const user = await registerUserCase.execute({
            name: 'John Doe',
            email: 'KX7Jt@example.com',
            password: '123456'
        }).then(res => res.user)

        const isPasswordHashed = await compare('123456', user.password_hash)
        expect(isPasswordHashed).toBe(true)
    })

    it('should not be able to register with same email', async () => {

        const repository = new InMemoryUserRepository();
        const registerUserCase = new RegisterUseCase(repository)

        const email = 'KX7Jt@example.com'
        await registerUserCase.execute({
            name: 'John Doe',
            email,
            password: '123456'
        })

        await expect(() =>
            registerUserCase.execute({
                name: 'John Doe',
                email,
                password: '123456'
            }),
        ).rejects.toBeInstanceOf(UserAlreadExistError)
    })
})