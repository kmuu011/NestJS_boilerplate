import {All, Body, Controller, Delete, Get, Next, Param, Patch, Post, Query, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from "guard/auth.guard";
import {NextFunction, Request} from "express";
import {Member} from "../../member/entities/member.entity";
import {Message} from "libs/message";
import {TodoGroupService} from "../todoGroup.service";
import {TodoService} from "./todo.service";
import {SelectQueryDto} from "../../../common/dto/select-query-dto";
import {TodoGroup} from "../entities/todoGroup.entity";
import {CreateTodoDto} from "./dto/create-todo-dto";
import {Todo} from "./entities/todo.entity";
import {UpdateTodoDto} from "./dto/update-todo-dto";
import {ResponseBooleanType, SelectListResponseType} from "../../../common/type/type";

@Controller('/todoGroup/:todoGroupIdx(\\d+)/todo')
export class TodoController {
    constructor(
        private readonly todoGroupService: TodoGroupService,
        private readonly todoService: TodoService
    ) {}

    @All(['*', '/'])
    @UseGuards(AuthGuard)
    async selectTodoGroup(
        @Req() req: Request,
        @Next() next: NextFunction,
        @Param('todoGroupIdx') todoGroupIdx: number
    ): Promise<void> {
        const member: Member = req.locals.memberInfo;

        const todoGroupInfo: TodoGroup = await this.todoGroupService.selectOne(member, todoGroupIdx);

        if (!todoGroupInfo) {
            throw Message.NOT_EXIST('todoGroup');
        }

        req.locals.todoGroupInfo = todoGroupInfo;

        next();
    }

    @Get('/')
    async selectList(
        @Req() req: Request,
        @Query() query: SelectQueryDto
    ): Promise<SelectListResponseType<Todo>> {
        const {page, count} = query;
        const todoGroupInfo: TodoGroup = req.locals.todoGroupInfo;

        return await this.todoService.selectList(todoGroupInfo, page, count);
    }

    @Post('/')
    async createTodo(
        @Req() req: Request,
        @Body() body: CreateTodoDto
    ): Promise<Todo> {
        const todoGroup: TodoGroup = req.locals.todoGroupInfo;

        return await this.todoService.create(todoGroup, body);
    }

    @All('/:todoIdx(\\d+)')
    async selectTodo(
        @Req() req: Request,
        @Next() next: NextFunction,
        @Param('todoIdx') todoIdx: number
    ): Promise<void> {
        const todoGroupInfo: TodoGroup = req.locals.todoGroupInfo;

        const todo: Todo = await this.todoService.selectOne(todoGroupInfo, todoIdx);

        if (!todo) {
            throw Message.NOT_EXIST('todo');
        }

        req.locals.todoInfo = todo;

        next();
    }

    @Patch('/:todoIdx(\\d+)')
    async updateTodo(
        @Req() req: Request,
        @Body() body: UpdateTodoDto
    ): Promise<ResponseBooleanType> {
        const todoInfo: Todo = req.locals.todoInfo;

        await this.todoService.update(todoInfo, body);

        return {result: true};
    }

}
