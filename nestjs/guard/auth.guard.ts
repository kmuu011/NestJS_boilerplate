import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {Member} from "src/member/entities/member.entity";

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(
        context: ExecutionContext
    ) {
        const req = context.switchToHttp().getRequest();
        const member = new Member();

        member.dataMigration({token: req.headers['x-token']});

        await member.decodeToken()

        return true;
    }
}
