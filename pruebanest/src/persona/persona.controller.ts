import { Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, Patch, Post, Put, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { PersonaService } from "./persona.service";
import { PersonaInsertDto } from "./dtos/persona-insert.dto";
import { PersonaUpdateDto } from "./dtos/persona-partialupdate.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { promisify } from "util";
import { unlink } from "fs";
import { AuthGuard } from "../auth/auth.guard";
import { ApiBearerAuth, ApiResponse, ApiSecurity, ApiUnauthorizedResponse } from "@nestjs/swagger";

const unlinkAsync = promisify(unlink);

@ApiSecurity("Bearer")
@ApiBearerAuth()
@Controller("personas")
export class PersonaController {
    constructor(private personaService: PersonaService) {}

    @UseGuards(AuthGuard)
    @Get("")
    @ApiResponse({
        status: 200,
        description: "Returns a list of all personas",
        type: [PersonaInsertDto],
    })
    @ApiUnauthorizedResponse({
        description: "Unauthorized",
    })
    getAll() {
        return this.personaService.findAll();
    }
    @UseGuards(AuthGuard)
    @Post("")
    create(@Body() createPersonaDto: PersonaInsertDto) {
        return this.personaService.create(createPersonaDto);
    }
    @UseGuards(AuthGuard)
    @Get(":id")
    async getOne(@Param("id") id: number) {
        const persona = await this.personaService.findById(id);
        if (!persona) {
            throw new NotFoundException();
        }
        return this.personaService.findById(id);
    }
    @UseGuards(AuthGuard)
    @Put(":id")
    async update(@Param("id") id: number, @Body() personaDto: PersonaInsertDto) {
        const persona = await this.personaService.findById(id);
        if (!persona) {
            throw new NotFoundException();
        }
        return this.personaService.update(personaDto, id);
    }
    @UseGuards(AuthGuard)
    @Patch(":id")
    async partialUpdate(@Param("id") id: number, @Body() personaDto: PersonaUpdateDto) {
        const persona = await this.personaService.findById(id);
        if (!persona) {
            throw new NotFoundException();
        }
        return this.personaService.update(personaDto, id);
    }
    @UseGuards(AuthGuard)
    @Delete(":id")
    async delete(@Param("id") idPersona: number) {
        const persona = await this.personaService.findById(idPersona);
        if (!persona) {
            throw new NotFoundException();
        }
        if (await this.personaService.delete(idPersona)) {
            return { message: "Persona deleted successfully" };
        }
        throw new InternalServerErrorException("Error deleting persona");
    }
    @UseGuards(AuthGuard)
    @Post("profile/:id")
    @UseInterceptors(FileInterceptor("image"))
    async uploadFile(@Param("id") idPersona: number, @UploadedFile() image: Express.Multer.File) {
        // console.log("Uploading file for persona with ID:", idPersona);
        const persona = await this.personaService.findById(idPersona);
        if (!persona) {
            if (image) {
                await unlinkAsync(image.path);
            }
            throw new NotFoundException("Persona not found");
        }
        return {
            filename: image.filename,
            path: image.path,
        };
    }
}
