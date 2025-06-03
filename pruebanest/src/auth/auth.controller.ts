import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dtos/signin.dto";
import { RegisterDto } from "./dtos/register.dto";
import { AuthGuard } from "./auth.guard";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("login")
    signIn(@Body() signInDto: SignInDto): Promise<any> {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }
    @Post("register")
    register(@Body() dto: RegisterDto): Promise<any> {
        return this.authService.register(dto.email, dto.password, dto.fullName);
    }

    @UseGuards(AuthGuard)
    @Get("me")
    me(@Request() req): any {
        const user = req.user;
        return user;
    }
}
