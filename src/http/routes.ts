import { FastifyInstance } from "fastify";
import { registerController as register } from "./controllers/register.controller";
import { authenticateController as authenticate } from "./controllers/authenticate.controller";

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', register)
    app.post('/sessions', authenticate)
}