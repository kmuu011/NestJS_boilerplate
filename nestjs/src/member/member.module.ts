import {Module} from '@nestjs/common';
import {MemberController} from './member.controller';
import {MemberService} from "./member.service";
import {MemberRepository} from "./member.repository";
import {Member} from "./entities/member.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([MemberRepository])],
    controllers: [MemberController],
    providers: [MemberService, Member],
})

export class MemberModule {}
