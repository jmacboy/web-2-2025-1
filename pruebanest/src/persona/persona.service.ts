import { Injectable } from "@nestjs/common";
import { Persona } from "./persona.model";
import { PersonaInsertDto } from "./dtos/persona-insert.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class PersonaService {
    constructor(
        @InjectRepository(Persona)
        private personasRepository: Repository<Persona>,
    ) {}

    findAll(): Promise<Persona[]> {
        return this.personasRepository.find();
    }
    create(persona: PersonaInsertDto): Promise<Persona> {
        const newPersona: Persona = {
            ...persona,
            id: 0,
        };
        return this.personasRepository.save(newPersona);
    }
    findById(id: number): Promise<Persona | null> {
        return this.personasRepository.findOneBy({ id });
    }
    async update(persona: PersonaInsertDto, id: number): Promise<Persona | null> {
        const updatedPersona: Persona = {
            ...persona,
            id,
        };
        await this.personasRepository.update(id.toString(), updatedPersona);
        return this.personasRepository.findOneBy({ id });
    }
    async delete(id: number): Promise<boolean> {
        try {
            await this.personasRepository.delete(id);
            return true;
        } catch (error) {
            console.error("Error deleting persona:", error);
            return false;
        }
    }
}
