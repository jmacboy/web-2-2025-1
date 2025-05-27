import { IsNumber, IsOptional, IsString } from "class-validator";

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
}
