import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, type Relation, Unique } from "typeorm";
import { SKU } from "./SKU";
import { Tienda } from "./Tienda";

// Este Enum es clave para resolver el Problema 2 (Caos del Flujo)
export enum UbicacionInventario {
  BODEGA = 'bodega',
  PISO_VENTA = 'piso_venta',
}

@Entity()
@Unique(['sku', 'tienda', 'ubicacion']) // Un SKU en una tienda y ubicación es único
export class InventarioTienda {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: UbicacionInventario,
    default: UbicacionInventario.BODEGA,
  })
  ubicacion: UbicacionInventario;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @ManyToOne(() => SKU, (sku) => sku.inventarioTiendas, { nullable: false })
  sku: Relation<SKU>;

  @ManyToOne(() => Tienda, (tienda) => tienda.inventario, { nullable: false })
  tienda: Relation<Tienda>;
}