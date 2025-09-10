import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import type { Relation } from "typeorm";
import { Club } from "./Club";

@Entity()
export class Evento {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne( () => Club, club => club.eventos, { cascade: true, onDelete: "CASCADE", onUpdate: "CASCADE" })
    club: Relation<Club>

    @Column("varchar")
    nombre : string

    @Column("varchar")
    descripcion : string

    @Column("date")
    fecha : Date

    @Column("smallint")
    hora : number

    @Column("varchar")
    lugar : string
}