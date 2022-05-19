import {All, Body, Controller, Delete, Get, Next, Param, Patch, Post, Query, Req, UseGuards} from '@nestjs/common';
import {TodoGroupService} from './todoGroup.service';
import {NextFunction, Request} from "express";
import {AuthGuard} from "guard/auth.guard";
import {Member} from "../member/entities/member.entity";
import {CreateTodoGroupDto} from "./dto/create-todoGroup-dto";
import {SelectQueryDto} from "../../common/dto/select-query-dto";
import {Message} from "libs/message";
import {UpdateTodoGroupDto} from "./dto/update-todoGroup-dto";
import {TodoGroup} from "./entities/todoGroup.entity";
import { SelectListResponseType} from "../../common/type/type";

@Controller('/todoGroup')
export class TodoGroupController {
    constructor(private readonly todoGroupService: TodoGroupService) {}

    @Get()
    @UseGuards(AuthGuard)
    async getTodoGroupList(
        @Req() req: Request,
        @Query() query: SelectQueryDto
    ): Promise<SelectListResponseType<TodoGroup>> {
        const {page, count} = query;
        const member: Member = req.locals.memberInfo;

        return await this.todoGroupService.selectList(member, page, count);
    }

    @Post()
    @UseGuards(AuthGuard)
    async createGroup(
        @Req() req: Request,
        @Body() body: CreateTodoGroupDto
    ): Promise<TodoGroup> {
        const member: Member = req.locals.memberInfo;

        return await this.todoGroupService.create(member, body);
    }

    @All('/:todoGroupIdx(\\d+)')
    @UseGuards(AuthGuard)
    async selectTodoGroup(
        @Req() req: Request,
        @Next() next: NextFunction,
        @Param('todoGroupIdx') todoGroupIdx: number
    ): Promise<void> {
        const member: Member = req.locals.memberInfo;

        const todoGroupInfo = await this.todoGroupService.selectOne(member, todoGroupIdx);

        if (!todoGroupInfo) {
            throw Message.NOT_EXIST('todoGroup');
        }

        req.locals.todoGroupInfo = todoGroupInfo;

        next();
    }

    @Get('/:todoGroupIdx(\\d+)')
    async selectOneTodoGroup(
        @Req() req: Request,
    ): Promise<TodoGroup> {
        return req.locals.todoGroupInfo;
    }

    @Patch('/:todoGroupIdx(\\d+)')
    async updateTodoGroup(
        @Req() req: Request,
        @Body() body: UpdateTodoGroupDto
    ) {
        const {memberInfo, todoGroupInfo} = req.res.locals;

        await this.todoGroupService.update(memberInfo, todoGroupInfo, body);

        return {result: true};
    }

    @Delete('/:todoGroupIdx(\\d+)')
    async deleteTodoGroup(
        @Req() req: Request,
    ) {
        const {memberInfo, todoGroupInfo} = req.res.locals;

        await this.todoGroupService.delete(memberInfo, todoGroupInfo);

        return {result: true};
    }


}
