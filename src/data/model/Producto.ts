import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, type Relation, UpdateDateColumn } from "typeorm";
import { SKU } from "./SKU";

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  nombreModelo: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ length: 100 })
  marca: string;

  @Column({ length: 100 })
  categoria: string;

  @OneToMany(() => SKU, (sku) => sku.producto)
  skus: Relation<SKU[]>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}