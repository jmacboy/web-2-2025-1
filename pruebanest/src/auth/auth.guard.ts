import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";

interface JwtPayload {
    sub: number; // User ID
}
interface Request {
    headers: {
        authorization?: string;
    };
    user?: {
        id: number;
        email: string;
        fullName: string;
    };
}
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private userService: UsersService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            console.error("No token found in request headers");
            throw new UnauthorizedException();
        }
        try {
            const payload: JwtPayload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
            });
            console.log("Token payload:", payload);
            const user = await this.userService.getUserById(payload.sub);
            if (!user) {
                throw new UnauthorizedException();
            }
            request["user"] = {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
            };
        } catch (error) {
            console.log("Token verification failed", error);
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(" ") ?? [];
        return type === "Bearer" ? token : undefined;
    }
}
