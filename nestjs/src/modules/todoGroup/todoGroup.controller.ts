import {All, Body, Controller, Get, Param, Post, Query, Req, UseGuards} from '@nestjs/common';
import {TodoGroupService} from './todoGroup.service';
import {Request} from "express";
import {AuthGuard} from "guard/auth.guard";
import {Member} from "../member/entities/member.entity";
import {CreateTodoGroupDto} from "./dto/create-todoGroup-dto";
import {SelectQueryDto} from "../../common/dto/select-query-dto";

@Controller('/todoGroup')
@UseGuards(AuthGuard)
export class TodoGroupController {
    constructor(private readonly todoGroupService: TodoGroupService) {}

    @Get()
    async getGroupList(
        @Req() req: Request,
        @Query() query: SelectQueryDto
    ){
        const member: Member = req.res.locals.memberInfo;

        return await this.todoGroupService.getList(member, query);
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
        @Param('todoGroupIdx') todoGroupIdx: number
    ){
         
    }

}
