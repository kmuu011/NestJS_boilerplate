import {Module} from '@nestjs/common';
import {MemberController} from './member.controller';
import {MemberService} from "./member.service";
import {MemberRepository} from "./member.repository";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TokenRepository} from "./token/token.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            MemberRepository,
            TokenRepository
        ]),
    ],
    controllers: [MemberController],
    providers: [MemberService],
})

export class MemberModule {
}
