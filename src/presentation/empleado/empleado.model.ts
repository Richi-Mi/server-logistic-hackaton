import { t } from "elysia";

export namespace EmpleadoModel {
    export const signUpBody = t.Object({
        nombre: t.String(),
        apellido: t.String(),
        usuario: t.String(),
        password: t.String(),
        puesto: t.String(),
        sucursalId: t.Number()  
    })
    export type SignUpBody = typeof signUpBody.static

    export const signInBody = t.Object({
        username: t.String(),
        password: t.String()
    })
    export type SignInBody = typeof signInBody.static
}