import { Member } from "../../member/entities/member.entity";
import { BaseEntity } from 'typeorm';
import { Todo } from "../todo/entities/todo.entity";
export declare class TodoGroup extends BaseEntity {
    idx: number;
    member: Member;
    title: string;
    order: number;
    todoList: Todo[];
    created_at: string;
    updated_at: string;
    dataMigration(object: object): void;
}
