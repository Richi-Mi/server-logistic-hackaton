import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, type Relation } from "typeorm";
import { Venta } from "./Venta";
import { SKU } from "./SKU";

@Entity()
export class DetalleVenta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  cantidad: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precioUnitarioVenta: number; // Precio al momento de la venta

  @ManyToOne(() => Venta, (venta) => venta.detalles, { nullable: false })
  venta: Relation<Venta>;

  @ManyToOne(() => SKU, (sku) => sku.ventasDetalle, { nullable: false, eager: true })
  sku: Relation<SKU>;
}