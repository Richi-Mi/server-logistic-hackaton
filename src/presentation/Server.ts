import Elysia from "elysia";
import cors from '@elysiajs/cors'

export class Server {
    public static start() {
        const app = new Elysia()
            .use(cors())
            .listen(Bun.env.PORT)
        
            console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
    }
}