import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {Member} from "../../modules/member/entities/member.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Message} from "../../../libs/message";
import {TokenRepository} from "../../modules/member/token/token.repository";
import * as utils from "../../../libs/utils";
import {Request, Response} from "express";
import { auth } from "../../../config/config";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @InjectRepository(TokenRepository) private tokenRepository: TokenRepository,
    ) {}

    async canActivate(
        context: ExecutionContext
    ): Promise<boolean> {
        const now: number = Date.now();
        const req: Request = context.switchToHttp().getRequest();
        const res: Response = context.switchToHttp().getResponse();
        const { ip, "user-agent": userAgent, "token-code": tokenCode } = req.headers

        const member: Member = new Member();

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

        const jwtPayload = await member.decodeToken();

        if(jwtPayload.keep_check === true && ((now-jwtPayload.time)/1000) > auth.tokenRefreshTime){
            member.dataMigration({
                keep_check: jwtPayload.keep_check
            });

            const newToken: string = member.createToken();
            const code: string = await utils.createKey<TokenRepository>(this.tokenRepository, 'code', 40);

            member.tokenInfo = await this.tokenRepository.saveToken(member, newToken, code);

            res.header('new-token-code', code);
        }

        req.locals.memberInfo = member;

        return true;
    }
}
