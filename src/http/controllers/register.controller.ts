import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case';
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function registerController(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { name, email, password } = bodySchema.parse(request.body);

    const registerUseCase = makeRegisterUseCase();


    await registerUseCase.execute({ name, email, password });

    return reply.status(201).send();
}