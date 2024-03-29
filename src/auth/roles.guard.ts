import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./roles-auth.decorator";


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private jwtService: JwtService,
        private reflector: Reflector) {

    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {

            const requiredRols = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ])

            if (!requiredRols) {
                return true
            }
            const req = context.switchToHttp().getRequest()

            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]

            if (bearer !== 'Bearer' || !token) {
                console.log(`Error: - ${token} ==|`)
                throw new UnauthorizedException({ message: 'Пользователь не авторизован' })

            }

            const user = this.jwtService.verify(token);
            req.user = user;
            return user.roles.some(role => requiredRols.includes(role.value))

        } catch (e) {
            console.log(`Error: - ${e} =|`)
            throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN)
        }
    }
}