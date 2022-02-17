import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthService } from "../auth/auth.service";


@Injectable()
export class CheckAuthGuard implements CanActivate {
    public constructor(private authService: AuthService) {
    }

    public canActivate(context: ExecutionContext): boolean {
        // const isPublic = this.reflector.get<boolean>("isPublic", context.getHandler());

        // if (isPublic) {
        //     return true;
        // }

        try {
            const ctx = GqlExecutionContext.create(context);
            const req = ctx.getContext().req;

            const token = req.headers["authorization"].split(' ')[1];
            if (!token) {
                throw new UnauthorizedException("Ошибка авторизации, состояние 1");
            }
            const decoded = this.authService.verify(token);
            req["user"] = decoded;
            return true;

        } catch (e) {
            throw new UnauthorizedException(e);
        }
    }
}