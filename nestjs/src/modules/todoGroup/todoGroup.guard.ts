import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Message} from "libs/message";
import {Request} from "express";
import {TodoGroupRepository} from "./todoGroup.repository";
import {Member} from "../member/entities/member.entity";
import {TodoGroup} from "./entities/todoGroup.entity";

@Injectable()
export class TodoGroupGuard implements CanActivate {
    constructor(
        @InjectRepository(TodoGroupRepository) private todoGroupRepository: TodoGroupRepository,
    ) {}

    async canActivate(
        context: ExecutionContext
    ): Promise<boolean> {
        const req: Request = context.switchToHttp().getRequest();
        const memberInfo: Member = req.locals.memberInfo;
        const todoGroupIdx: number = Number(req.params.todoGroupIdx)

        const todoGroupInfo: TodoGroup = await this.todoGroupRepository.selectOne(memberInfo, todoGroupIdx);

        if (!todoGroupInfo) {
            throw Message.NOT_EXIST('todoGroup');
        }

        req.locals.todoGroupInfo = todoGroupInfo;

        return true;
    }
}
