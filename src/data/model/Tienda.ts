import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, type Relation, UpdateDateColumn } from "typeorm";
import { Empleado } from "./Empleado";
import { InventarioTienda } from "./InventarioTienda";
import { Venta } from "./Venta";


@Entity()
export class Tienda {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => Empleado, (empleado) => empleado.tienda)
  empleados: Relation<Empleado[]>;

  @OneToMany(() => InventarioTienda, (inventario) => inventario.tienda)
  inventario: Relation<InventarioTienda[]>;

  @OneToMany(() => Venta, (venta) => venta.tienda)
  ventas: Relation<Venta[]>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}