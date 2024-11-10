import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms.repository"
import { CreateGymUseCase } from "../create-gym.usecase"

export function makeCreateGymUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CreateGymUseCase(gymsRepository)

  return useCase
}
