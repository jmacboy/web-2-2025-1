import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { stringToSha1 } from "./crypto.utils";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}
    async signIn(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException();
        }
        const hashedPassword = stringToSha1(pass);
        if (user.password !== hashedPassword) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
    async register(email: string, pass: string, fullName: string): Promise<any> {
        const existingUser = await this.usersService.findByEmail(email);
        if (existingUser) {
            throw new ConflictException("User already exists");
        }
        const hashedPassword = stringToSha1(pass);
        await this.usersService.create({
            email,
            password: hashedPassword,
            fullName,
        });
        return {
            result: "User created successfully",
        };
    }
}
