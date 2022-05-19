import {All, Body, Controller, Delete, Get, Next, Param, Patch, Post, Query, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from "guard/auth.guard";
import {NextFunction, Request} from "express";
import {Member} from "../../member/entities/member.entity";
import {Message} from "libs/message";
import {TodoGroupService} from "../todoGroup.service";
import {TodoService} from "./todo.service";
import {SelectQueryDto} from "../../../common/dto/select-query-dto";
import {TodoGroup} from "../entities/todoGroup.entity";

@Controller('/todoGroup/:todoGroupIdx(\\d+)/todo')
@UseGuards(AuthGuard)
export class TodoController {
    constructor(
        private readonly todoGroupService: TodoGroupService,
        private readonly todoService: TodoService
    ) {}

    @All('/')
    async selectTodoGroup(
        @Req() req: Request,
        @Next() next: NextFunction,
        @Param('todoGroupIdx') todoGroupIdx: number
    ) {
        const member: Member = req.res.locals.memberInfo;

        const todoGroupInfo: TodoGroup = await this.todoGroupService.selectOne(member, todoGroupIdx);

        if (!todoGroupInfo) {
            throw Message.NOT_EXIST('todoGroup');
        }

        req.res.locals.todoGroupInfo = todoGroupInfo;

        next();
    }

    @Get('/')
    async selectOneTodoGroup(
        @Req() req: Request,
        @Query() query: SelectQueryDto
    ) {
        const { page, count } = query;
        const todoGroupInfo: TodoGroup = req.res.locals.todoGroupInfo;

        return await this.todoService.selectList(todoGroupInfo, page, count);
    }

}
