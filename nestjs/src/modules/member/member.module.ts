import {Module} from '@nestjs/common';
import {MemberController} from './member.controller';
import {MemberService} from "./member.service";
import {MemberRepository} from "./member.repository";
import {Member} from "./entities/member.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TokenRepository} from "./token/token.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([MemberRepository]),
        TypeOrmModule.forFeature([TokenRepository])
    ],
    controllers: [MemberController],
    providers: [MemberService, Member],
})

export class MemberModule {}
