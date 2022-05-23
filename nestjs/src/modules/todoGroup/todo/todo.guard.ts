import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Request} from "express";
import {TodoRepository} from "./todo.repository";
import {Todo} from "./entities/todo.entity";
import {TodoGroup} from "../entities/todoGroup.entity";
import {Message} from "libs/message";

@Injectable()
export class TodoGuard implements CanActivate {
    constructor(
        @InjectRepository(TodoRepository) private todoRepository: TodoRepository,
    ) {}

    async canActivate(
        context: ExecutionContext
    ): Promise<boolean> {
        const req: Request = context.switchToHttp().getRequest();
        const todoGroupInfo: TodoGroup = req.locals.todoGroupInfo;
        const todoIdx: number = Number(req.params.todoIdx);

        const todoInfo: Todo = await this.todoRepository.selectOne(todoGroupInfo, todoIdx);

        if (!todoInfo) {
            throw Message.NOT_EXIST('todo');
        }

        req.locals.todoInfo = todoInfo;

        return true;
    }
}
