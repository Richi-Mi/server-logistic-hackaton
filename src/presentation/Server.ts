import Elysia from "elysia";
import cors from '@elysiajs/cors'

import { usuarioRoutes } from "./empleado";
import { CustomError } from "../domain/CustomError";
import { productoRoutes } from "./producto";

export class Server {
    public static start() {
        const app = new Elysia()
          .error({
                'custom': CustomError
            })
            .onError(({ error, status, code }) => {
                // TODO: Quit this in production    
                console.error(error);
                if (error instanceof CustomError && code === 'custom')
                return status(error.statusCode, error.toResponse());

                if (code === 'VALIDATION')
                return status(400, { message: error.customError });

                return status(500, { message: "Internal Server Error" });
            })
            .use(cors())
            .use(usuarioRoutes)
            .use(productoRoutes)
            .listen(Bun.env.PORT)
        
        console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
    }
}