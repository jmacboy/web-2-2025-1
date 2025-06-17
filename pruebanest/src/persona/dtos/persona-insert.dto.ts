import { ApiProperty } from "@nestjs/swagger";
import { IsISO8601, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PersonaInsertDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly nombre: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly apellido: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly edad: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsISO8601()
    readonly fechaNacimiento: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly ciudad: string;
}
