import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class RegisterDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly email: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly password: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly fullName: string;
}
