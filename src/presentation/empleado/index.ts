import Elysia from "elysia";

import { tokenPlugin } from "../../config/tokens";
import { EmpleadoController } from "./empleado.controller";
import { EmpleadoModel } from "./empleado.model";

export const usuarioRoutes = new Elysia({ prefix: "/user" })
    .decorate('userController', new EmpleadoController())
    .post("/", async ({ status, body, userController }) => {
        console.log(body);
        
        await userController.doRegister(body)
        return status(201, {message: "Usuario creado"})
    }, {
        body: EmpleadoModel.signUpBody
    })
    .use(tokenPlugin)
    .put("/", async ({ status, userController, body, tokenPlugin }) => {
        const { empleado, puesto } = await userController.doLogin(body)
        return status(200, {
            token: await tokenPlugin.sign({ username: empleado.usuario, puesto }),
            empleado
        })
    }, {
        body: EmpleadoModel.signInBody
    })
    .get("/tiendas", async ({ userController }) => {
        const tiendas = await userController.getTiendas()        
        return tiendas
    })