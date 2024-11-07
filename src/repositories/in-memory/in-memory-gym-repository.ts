import { Gym } from '@prisma/client';
import { GymsRepository } from '../intefaces/gym-repository';

export class InMemoryGymsRepository implements GymsRepository {

    public gyms: Gym[] = [];

    async findbyId(id: string): Promise<Gym | null> {
        const gym = this.gyms.find(gym => gym.id === id);

        if (!gym) {
            return null;
        }
        return gym;
    }

}