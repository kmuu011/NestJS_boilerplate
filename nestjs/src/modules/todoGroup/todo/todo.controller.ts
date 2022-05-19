import {All, Body, Controller, Delete, Get, Next, Param, Patch, Post, Query, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from "guard/auth.guard";
import {NextFunction, Request} from "express";
import {Member} from "../../member/entities/member.entity";
import {Message} from "utils/message";
import {TodoGroupService} from "../todoGroup.service";

@Controller('/todoGroup/:todoGroupIdx(\\d+)/todo')
@UseGuards(AuthGuard)
export class TodoController {
    constructor(private readonly todoGroupService: TodoGroupService) {}

    @All('/')
    async selectTodoGroup(
        @Req() req: Request,
        @Next() next: NextFunction,
        @Param('todoGroupIdx') todoGroupIdx: number
    ){
        const member: Member = req.res.locals.memberInfo;

        const todoGroupInfo = await this.todoGroupService.selectOne(member, todoGroupIdx);

        if(!todoGroupInfo){
            throw Message.NOT_EXIST('todoGroup');
        }

        req.res.locals.todoGroupInfo = todoGroupInfo;

        next();
    }

    @Get('/')
    async selectOneTodoGroup(
        @Req() req: Request,
    ){
        return req.res.locals.todoGroupInfo;
    }

}
