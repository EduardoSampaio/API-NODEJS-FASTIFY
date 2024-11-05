import fastify from "fastify";
import { appRoutes } from "./http/routes";
import { ZodError } from "zod";
import { env } from "./env";
import { UserAlreadExistError } from "./errors/user-already-exists";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

export const app = fastify();

app.register(appRoutes);

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({
            message: 'Validation error.',
            issues: error.format()
        })
    }

    if (error instanceof InvalidCredentialsError) {
        return reply.status(400).send({ message: error.message })
    }

    if (error instanceof UserAlreadExistError) {
        return reply.status(409).send({ message: error.message })
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error);
    } else {
        // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
    }

    return reply.status(500).send({
        message: 'Internal server error.'
    });
});