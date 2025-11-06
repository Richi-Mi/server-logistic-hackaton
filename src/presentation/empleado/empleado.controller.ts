import { status } from "elysia";
import { PostgresDataSource } from "../../data/PostgresDataSource";
import { EmpleadoModel } from "./empleado.model";
import { Empleado, Tienda } from "../../data/model";

export class EmpleadoController {

    constructor(
        private empleadoRepository = PostgresDataSource.getRepository(Empleado),
        private tiendaRepository = PostgresDataSource.getRepository(Tienda)
    ) {}

    public doRegister = async (data : EmpleadoModel.SignUpBody ) => {
        const empleado = new Empleado()

        empleado.nombre = data.nombre
        empleado.usuario = data.usuario
        empleado.apellido = data.apellido
        empleado.contrasenaHash = Bun.password.hashSync(data.password)
        empleado.puesto = data.puesto
        empleado.tienda = { id: data.sucursalId } as any

        await this.empleadoRepository.save(empleado)
    }
    public doLogin = async ({ username, password }: EmpleadoModel.SignInBody) => {
        const empleado = await this.empleadoRepository.findOne(
            { where: { usuario: username }, relations: { tienda: true } }
        );
        if(!empleado)
            throw status(401, `Empleado con el usuario: ${username} no encontrado`)

        const isPasswordCorrect = Bun.password.verifySync(password, empleado.contrasenaHash)
        if(!isPasswordCorrect)
            throw status(401, `Contraseña incorrecta`)

        const { contrasenaHash, tienda: { nombre }, ...rest } = empleado;
        return { empleado: { ...rest, tienda: nombre }, puesto: empleado.puesto }
    }
    public getTiendas = async () => {
        const tiendas = await this.tiendaRepository.find();

        return tiendas.map(t => { return { id: t.id, nombre: t.nombre } });
    }
}