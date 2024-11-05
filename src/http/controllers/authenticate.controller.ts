import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case';

export async function authenticateController(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, password } = bodySchema.parse(request.body);

    const authenticateUseCase = makeAuthenticateUseCase();

    await authenticateUseCase.execute({ email, password });

    return reply.status(200).send();
}