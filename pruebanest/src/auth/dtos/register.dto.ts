import { IsNotEmpty, IsString } from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    readonly email: string;
    @IsNotEmpty()
    @IsString()
    readonly password: string;
    @IsNotEmpty()
    @IsString()
    readonly fullName: string;
}
