import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";
import type { Relation } from "typeorm";
import { Club } from "./Club";

export enum UserRole {
    ADMIN       = "admin",
    ESTUDIANTE  = "estudiante",
    PROFESOR    = "profesor"
}

@Entity()
export class Usuario {

    @PrimaryColumn("varchar")
    correo : string

    @Column("varchar")
    nombre: string

    @Column("varchar")
    apellido_paterno : string

    @Column("varchar")
    apellido_materno : string

    @Column("varchar")
    password : string

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.ESTUDIANTE
    })
    role : UserRole

    @ManyToMany( () => Club, club => club.inscritos, { cascade: true, onDelete: "CASCADE", onUpdate: "CASCADE" })
    clubes : Relation<Club[]>
}