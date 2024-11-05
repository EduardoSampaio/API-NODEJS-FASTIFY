import { PrismaUserRepository } from "@/repositories/prisma-users.repository";
import { RegisterUseCase } from "../register.usecase";

export function makeRegisterUseCase() {
    return new RegisterUseCase(new PrismaUserRepository())
}