import {Injectable} from '@nestjs/common';
import {Member} from "../../member/entities/member.entity";
import {SelectObject} from "../../../common/type/type";
import {TodoRepository} from "./todo.repository";
import {Todo} from "./entities/todo.entity";
import {TodoGroup} from "../entities/todoGroup.entity";

@Injectable()
export class TodoService {
    constructor(
       private readonly todoRepository: TodoRepository
    ) {}

    async selectOne(todoGroup: TodoGroup, todoIdx: number): Promise<Todo> {
        return await this.todoRepository.selectOne(todoGroup, todoIdx);
    }

    async selectList(todoGroup: TodoGroup, page: number, count: number): Promise<SelectObject<Todo>> {
        const result = await this.todoRepository.selectList(todoGroup, page, count);

        return {
            items: result[0],
            page,
            count,
            totalCount: result[1],
            last: Math.ceil(result[1] / count) || 1
        };
    }
}
