import { PrismaUserRepository } from "@/repositories/prisma/prisma-users.repository";
import { AuthenticateUseCase } from "../authenticate.usecase";

export function makeAuthenticateUseCase() {
    return new AuthenticateUseCase(new PrismaUserRepository())
}