import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common';
import {TodoGroupService} from './todoGroup.service';
import {Request} from "express";
import {AuthGuard} from "src/common/guard/auth.guard";
import {Member} from "../member/entities/member.entity";
import {CreateTodoGroupDto} from "./dto/create-todoGroup-dto";
import {SelectQueryDto} from "../../common/dto/select-query-dto";
import {UpdateTodoGroupDto} from "./dto/update-todoGroup-dto";
import {TodoGroup} from "./entities/todoGroup.entity";
import {ResponseBooleanType, SelectListResponseType} from "../../common/type/type";
import {TodoGroupGuard} from "./todoGroup.guard";

@Controller('/todoGroup')
@UseGuards(AuthGuard)
export class TodoGroupController {
    constructor(private readonly todoGroupService: TodoGroupService) {}

    @Get()
    async getTodoGroupList(
        @Req() req: Request,
        @Query() query: SelectQueryDto
    ): Promise<SelectListResponseType<TodoGroup>> {
        const {page, count} = query;
        const member: Member = req.locals.memberInfo;

        return await this.todoGroupService.selectList(member, page, count);
    }

    @Post()
    async createGroup(
        @Req() req: Request,
        @Body() body: CreateTodoGroupDto
    ): Promise<TodoGroup> {
        const member: Member = req.locals.memberInfo;

        return await this.todoGroupService.create(member, body);
    }

    @Get('/:todoGroupIdx(\\d+)')
    @UseGuards(TodoGroupGuard)
    async selectOneTodoGroup(
        @Req() req: Request,
        @Param('todoGroupIdx') todoGroupIdx: number,
    ): Promise<TodoGroup> {
        return req.locals.todoGroupInfo;
    }

    @Patch('/:todoGroupIdx(\\d+)')
    @UseGuards(TodoGroupGuard)
    async updateTodoGroup(
        @Req() req: Request,
        @Body() body: UpdateTodoGroupDto,
        @Param('todoGroupIdx') todoGroupIdx: number,
    ): Promise<ResponseBooleanType> {
        const {memberInfo, todoGroupInfo} = req.res.locals;

        await this.todoGroupService.update(memberInfo, todoGroupInfo, body);

        return {result: true};
    }

    @Delete('/:todoGroupIdx(\\d+)')
    @UseGuards(TodoGroupGuard)
    async deleteTodoGroup(
        @Req() req: Request,
        @Param('todoGroupIdx') todoGroupIdx: number,
    ): Promise<ResponseBooleanType> {
        const {memberInfo, todoGroupInfo} = req.res.locals;

        await this.todoGroupService.delete(memberInfo, todoGroupInfo);

        return {result: true};
    }


}
