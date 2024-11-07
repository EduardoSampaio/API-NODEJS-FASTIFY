import { Gym } from "@prisma/client";

export interface GymsRepository {
    findbyId(id: string): Promise<Gym | null>;
}