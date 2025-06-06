import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Persona {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;
    @Column()
    apellido: string;
    @Column()
    edad: number;
    @Column()
    fechaNacimiento: string;
    @Column()
    ciudad: string;
}
