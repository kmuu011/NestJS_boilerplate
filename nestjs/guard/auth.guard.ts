import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {Member} from "src/member/entities/member.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Message} from "../libs/message";
import {TokenRepository} from "../src/member/token.repository";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @InjectRepository(TokenRepository) private tokenRepository: TokenRepository,
    ) {}

    async canActivate(
        context: ExecutionContext
    ) {
        const req = context.switchToHttp().getRequest();
        const { ip, "user-agent": userAgent, "token-code": tokenCode } = req.headers

        const member = new Member();

        const memberInfo = await this.tokenRepository.createQueryBuilder('t')
            .select([
                'm.idx', 'm.id', 'm.nickname', 'm.email', 'm.profile_img_key', 'm.created_at',
                'm.ip', 'm.user_agent', 'm.auth_type', 'm.auth_id',
                't.idx', 't.code', 't.token'
            ])
            .leftJoin('t.member', 'm')
            .where('t.memberIdx = m.idx ' +
                'AND t.code = :code', {code: tokenCode})
            .getOne();

        if(!memberInfo || memberInfo.member.ip !== ip || memberInfo.member.user_agent !== userAgent){
            throw Message.UNAUTHORIZED;
        }

        member.dataMigration(memberInfo.member);

        member.tokenInfo = memberInfo;
        delete memberInfo.member;

        req.body.memberInfo = member;

        return true;
    }
}
