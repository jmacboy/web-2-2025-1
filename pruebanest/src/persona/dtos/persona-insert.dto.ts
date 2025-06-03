import { IsISO8601, IsNotEmpty, IsNumber, IsString } from "class-validator";

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
    @IsNotEmpty()
    @IsISO8601()
    readonly fechaNacimiento: string;
    @IsNotEmpty()
    @IsString()
    readonly ciudad: string;
}
