import { FastifyInstance } from "fastify";
import { profile } from "./profile.controller";
import { authenticateController } from "./authenticate.controller";
import { registerController } from "./register.controller";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { refresh } from "./refresh";


export async function userRoutes(app: FastifyInstance) {
    app.post('/users', registerController)
    app.post('/sessions', authenticateController)
    app.patch('/token/refresh', { onRequest: verifyJWT }, refresh)
    /** Authenticated */
    app.get('/me', { onRequest: verifyJWT }, profile);
}