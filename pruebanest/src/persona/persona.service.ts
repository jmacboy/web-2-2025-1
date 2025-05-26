import { Injectable } from "@nestjs/common";
import { Persona } from "./persona.model";
import { PersonaInsertDto } from "./dtos/persona-insert.dto";

@Injectable()
export class PersonaService {
    private readonly personas: Persona[] = [];
    findAll(): Persona[] {
        return this.personas;
    }
    create(persona: PersonaInsertDto): Persona {
        const newPersona: Persona = {
            id: this.personas.length + 1,
            ...persona,
        };
        this.personas.push(newPersona);
        return newPersona;
    }
}
