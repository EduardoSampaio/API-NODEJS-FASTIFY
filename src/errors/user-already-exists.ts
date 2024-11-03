export class UserAlreadExistError extends Error {
    constructor() {
        super('Email already exists.')
    }
}