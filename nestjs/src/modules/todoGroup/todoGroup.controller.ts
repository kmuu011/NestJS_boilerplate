import {All, Body, Controller, Delete, Get, Next, Param, Patch, Post, Query, Req, UseGuards} from '@nestjs/common';
import {TodoGroupService} from './todoGroup.service';
import {NextFunction, Request} from "express";
import {AuthGuard} from "guard/auth.guard";
import {Member} from "../member/entities/member.entity";
import {CreateTodoGroupDto} from "./dto/create-todoGroup-dto";
import {SelectQueryDto} from "../../common/dto/select-query-dto";
import {Message} from "libs/message";
import {UpdateTodoGroupDto} from "./dto/update-todoGroup-dto";

@Controller('/todoGroup')
@UseGuards(AuthGuard)
export class TodoGroupController {
    constructor(private readonly todoGroupService: TodoGroupService) {}

    @Get()
    async getGroupList(
        @Req() req: Request,
        @Query() query: SelectQueryDto
    ){
        const { page, count } = query;
        const member: Member = req.res.locals.memberInfo;

        return await this.todoGroupService.getList(member, page, count);
    }

    @Post()
    async createGroup(
        @Req() req: Request,
        @Body() body: CreateTodoGroupDto
    ){
        const member: Member = req.res.locals.memberInfo;

        return await this.todoGroupService.createTodoGroup(member, body);
    }

    @All('/:todoGroupIdx(\\d+)')
    async selectGroup(
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

    @Get('/:todoGroupIdx(\\d+)')
    async selectOne(
        @Req() req: Request,
    ){
        return req.res.locals.todoGroupInfo;
    }


    @Patch('/:todoGroupIdx(\\d+)')
    async updateTodoGroup(
        @Req() req: Request,
        @Body() body: UpdateTodoGroupDto
    ){
        const todoGroupInfo = req.res.locals.todoGroupInfo;
        todoGroupInfo.dataMigration(body);

        await this.todoGroupService.updateTodoGroup(todoGroupInfo);

        return {result: true};
    }


    @Delete('/:todoGroupIdx(\\d+)')
    async deleteTodoGroup(
        @Req() req: Request,
    ){
        const todoGroupInfo = req.res.locals.todoGroupInfo;

        await this.todoGroupService.deleteTodoGroup(todoGroupInfo);

        return {result: true};
    }

}
