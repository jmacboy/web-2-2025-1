import { ApiProperty } from "@nestjs/swagger";
import { IsISO8601, IsNumber, IsOptional, IsString } from "class-validator";

export class PersonaUpdateDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly nombre: string;
    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly apellido: string;
    @ApiProperty()
    @IsOptional()
    @IsNumber()
    readonly edad: number;
    @ApiProperty()
    @IsOptional()
    @IsISO8601()
    readonly fechaNacimiento: string;
    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly ciudad: string;
}
