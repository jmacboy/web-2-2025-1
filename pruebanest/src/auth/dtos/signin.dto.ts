import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly email: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly password: string;
}
