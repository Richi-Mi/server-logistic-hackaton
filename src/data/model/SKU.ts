import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, type Relation } from "typeorm";
import { Producto } from "./Producto";
import { InventarioTienda } from "./InventarioTienda";
import { DetalleVenta } from "./DetalleVenta";

@Entity()
export class SKU {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 100 })
  codigoBarras: string;

  @Column({ length: 20 })
  talla: string;

  @Column({ length: 50 })
  color: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precioVenta: number;

  @ManyToOne(() => Producto, (producto) => producto.skus, { nullable: false })
  producto: Relation<Producto>;

  @OneToMany(() => InventarioTienda, (inventario) => inventario.sku, { cascade: true })
  inventarioTiendas: Relation<InventarioTienda[]>;

  @OneToMany(() => DetalleVenta, (detalle) => detalle.sku, { cascade: true })
  ventasDetalle: Relation<DetalleVenta[]>;

  @CreateDateColumn()
  createdAt: Date;
}