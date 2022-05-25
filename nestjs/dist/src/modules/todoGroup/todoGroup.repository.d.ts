import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { TodoGroup } from "./entities/todoGroup.entity";
import { Member } from "../member/entities/member.entity";
export declare class TodoGroupRepository extends Repository<TodoGroup> {
    selectOne(member: Member, todoGroupIdx: number): Promise<TodoGroup>;
    selectList(member: Member, page?: number, count?: number): Promise<[TodoGroup[], number]>;
    createTodoGroup(todoGroup: TodoGroup): Promise<TodoGroup>;
    updateTodoGroup(todoGroup: TodoGroup): Promise<UpdateResult>;
    deleteTodoGroup(todoGroup: TodoGroup): Promise<DeleteResult>;
}
