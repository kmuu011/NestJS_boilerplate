import { Module } from '@nestjs/common';
import { TodoGroupController } from './todoGroup.controller';
import { TodoFileController } from "./file/file.controller";

import { TodoGroupService } from './todoGroup.service';
import { TodoFileService } from "./file/file.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TokenRepository} from "../member/token/token.repository";
import {MemberRepository} from "../member/member.repository";
import {TodoGroupRepository} from "./todoGroup.repository";


@Module({
    imports: [
        TypeOrmModule.forFeature([
            MemberRepository,
            TokenRepository,
            TodoGroupRepository,
        ]),
    ],
    controllers: [TodoGroupController, TodoFileController],
    providers: [TodoGroupService, TodoFileService],
})

export class TodoGroupModule {}
