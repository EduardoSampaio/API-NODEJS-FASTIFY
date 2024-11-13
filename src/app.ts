import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";

import { ZodError } from "zod";
import { env } from "./env";
import { UserAlreadExistError } from "./errors/user-already-exists";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { userRoutes } from "./http/controllers/users/user-routes";
import { checkInsRoutes } from "./http/controllers/check-ins/routes";
import fastifyCookie from "@fastify/cookie";
import { gymsRoutes } from "./http/controllers/gyms/routes";

export const app = fastify();

app.register(fastifyCookie)
app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false
    },
    sign: {
        expiresIn: '10m'
    }
})

app.register(userRoutes);
app.register(gymsRoutes);
app.register(checkInsRoutes);

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