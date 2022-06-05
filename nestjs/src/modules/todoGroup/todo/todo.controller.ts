import {
    Body,
    Controller,
    Delete,
    Get,
    Patch,
    Post,
    Query,
    Req,
    UseGuards, UseInterceptors,
} from '@nestjs/common';
import {AuthGuard} from "src/common/guard/auth.guard";
import {Request} from "express";
import {TodoGroupService} from "../todoGroup.service";
import {TodoService} from "./todo.service";
import {SelectQueryDto} from "../../../common/dto/select-query-dto";
import {TodoGroup} from "../entities/todoGroup.entity";
import {CreateTodoDto} from "./dto/create-todo-dto";
import {Todo} from "./entities/todo.entity";
import {UpdateTodoDto} from "./dto/update-todo-dto";
import {ResponseBooleanType, SelectListResponseType} from "../../../common/type/type";

import {TodoInterceptor} from "./todo.interceptor";
import {TodoGroupInterceptor} from "../todoGroup.interceptor";

@Controller('/todoGroup/:todoGroupIdx(\\d+)/todo')
@UseInterceptors(TodoGroupInterceptor)
@UseGuards(AuthGuard)
export class TodoController {
    constructor(
        private readonly todoGroupService: TodoGroupService,
        private readonly todoService: TodoService
    ) {}

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

    @Patch('/:todoIdx(\\d+)')
    @UseInterceptors(TodoInterceptor)
    async updateTodo(
        @Req() req: Request,
        @Body() body: UpdateTodoDto
    ): Promise<ResponseBooleanType> {
        const todoInfo: Todo = req.locals.todoInfo;

        await this.todoService.update(todoInfo, body);

        return {result: true};
    }

    @Delete('/:todoIdx(\\d+)')
    @UseInterceptors(TodoInterceptor)
    async deleteTodo(
        @Req() req: Request
    ): Promise<ResponseBooleanType> {
        const todoInfo: Todo = req.locals.todoInfo;

        await this.todoService.delete(todoInfo);

        return {result: true};
    }

}
