import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, type Relation } from "typeorm";
import { Tienda } from "./Tienda";
import { Venta } from "./Venta";

@Entity()
export class Empleado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({ unique: true })
  usuario: string;

  @Column()
  contrasenaHash: string; // ¡Recuerda hashear esto!

  @Column()
  puesto: string;

  @ManyToOne(() => Tienda, (tienda) => tienda.empleados, { nullable: false })
  tienda: Relation<Tienda>;

  @OneToMany(() => Venta, (venta) => venta.empleado)
  ventasRegistradas: Relation<Venta[]>;

  @CreateDateColumn()
  createdAt: Date;
}