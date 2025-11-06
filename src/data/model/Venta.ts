import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, type Relation } from "typeorm";
import { Tienda } from "./Tienda";
import { Empleado } from "./Empleado";
import { DetalleVenta } from "./DetalleVenta";

@Entity()
export class Venta {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  fechaHora: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @ManyToOne(() => Tienda, (tienda) => tienda.ventas, { nullable: false })
  tienda: Relation<Tienda>;

  @ManyToOne(() => Empleado, (empleado) => empleado.ventasRegistradas, { nullable: false })
  empleado: Relation<Empleado>;

  // Con cascade: true, los detalles se guardarán automáticamente al guardar la venta
  @OneToMany(() => DetalleVenta, (detalle) => detalle.venta, { cascade: true })
  detalles: Relation<DetalleVenta[]>;
}