import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import type { Relation } from "typeorm";
import { Club } from "./Club";

@Entity()
export class Horario {
    
    @PrimaryGeneratedColumn()
    id : number

    @ManyToOne(() => Club, club => club.horarios, { cascade: true, onDelete: "CASCADE", onUpdate: "CASCADE" })
    club : Relation<Club>

    @Column("date")
    fecha : Date

    @Column("smallint")
    hora : number
}