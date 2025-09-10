import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import type { Relation } from 'typeorm'

import { Usuario } from "./Usuario";
import { Horario } from "./Horario";
import { Evento } from "./Evento";

export enum ClubState {
    APROBADO    = "aprobado",
    PENDIENTE   = "pendiente",
    RECHAZADO   = "rechazado"
}

@Entity()
export class Club {

    @PrimaryGeneratedColumn()
    id_club : number

    @Column("varchar")
    nombre : string

    @Column("varchar")
    descripcion : string

    @Column({
        type: "enum",
        enum: ClubState,
        default: ClubState.PENDIENTE
    })
    estado : ClubState

    @OneToOne(() => Usuario)
    @JoinColumn()
    alumno_encargado : Relation<Usuario>

    @OneToOne(() => Usuario)
    @JoinColumn()
    profesor_encargado : Relation<Usuario>

    @Column("varchar")
    img_url : string

    @Column("varchar")
    escuela : string

    @Column("varchar")
    ubicacion : string

    @OneToMany( () => Horario, horario => horario.club)
    horarios : Relation<Horario[]>

    @OneToMany( () => Evento, event => event.club)
    eventos : Relation<Evento[]>

    @ManyToMany( () => Usuario, usuario => usuario.clubes)
    @JoinTable()
    inscritos: Relation<Usuario[]>
}
/**
 * Again, @JoinColumn must be set only on one side of the relation 
 * - the side that must have the foreign key in the database table.
 */