import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PersonaInsertDto {
    @IsNotEmpty()
    @IsString()
    readonly nombre: string;
    @IsNotEmpty()
    @IsString()
    readonly apellido: string;
    @IsNotEmpty()
    @IsNumber()
    readonly edad: number;
}
