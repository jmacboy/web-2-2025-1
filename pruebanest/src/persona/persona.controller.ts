import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { PersonaService } from "./persona.service";
import { PersonaInsertDto } from "./dtos/persona-insert.dto";

@Controller("personas")
export class PersonaController {
    constructor(private personaService: PersonaService) {}

    @Get("")
    getAll() {
        return this.personaService.findAll();
    }
    @Post("")
    create(@Body() createPersonaDto: PersonaInsertDto) {
        return this.personaService.create(createPersonaDto);
    }
    @Get(":id")
    getOne(@Param("id") id: string) {
        return "Get persona con id " + id;
    }
    @Put(":id")
    update(@Param("id") id: number) {
        return "Update persona con id " + id;
    }
    @Patch(":id")
    partialUpdate(@Param("id") id: number) {
        return "Partial update persona con id " + id;
    }
    @Delete(":id")
    delete(@Param("id") id: number) {
        return "Delete one persona con id " + id;
    }
}
