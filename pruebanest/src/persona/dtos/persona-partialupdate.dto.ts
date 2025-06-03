import { IsISO8601, IsNumber, IsOptional, IsString } from "class-validator";

export class PersonaUpdateDto {
    @IsOptional()
    @IsString()
    readonly nombre: string;
    @IsOptional()
    @IsString()
    readonly apellido: string;
    @IsOptional()
    @IsNumber()
    readonly edad: number;
    @IsOptional()
    @IsISO8601()
    readonly fechaNacimiento: string;
    @IsOptional()
    @IsString()
    readonly ciudad: string;
}
