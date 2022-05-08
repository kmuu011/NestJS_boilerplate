import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {Member} from "src/member/entities/member.entity";
import {MemberRepository} from "../src/member/member.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Message} from "../libs/message";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @InjectRepository(MemberRepository) private memberRepository: MemberRepository,
    ) {}

    async canActivate(
        context: ExecutionContext
    ) {
        const req = context.switchToHttp().getRequest();
        const { ip, "user-agent": user_agent, "x-token": token } = req.headers
        const member = new Member();

        member.dataMigration({token});

        await member.decodeToken();

        const memberInfo = await this.memberRepository.select(member);

        if(!memberInfo || memberInfo.ip !== ip || memberInfo.user_agent !== user_agent || memberInfo.token !== token){
            throw Message.UNAUTHORIZED;
        }

        member.dataMigration(memberInfo);

        req.body.memberInfo = member;

        return true;
    }
}
