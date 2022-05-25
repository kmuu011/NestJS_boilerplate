import { BaseEntity } from 'typeorm';
import { TodoGroup } from "../../entities/todoGroup.entity";
export declare class Todo extends BaseEntity {
    idx: number;
    todoGroup: TodoGroup;
    content: string;
    created_at: string;
    updated_at: string;
    completed_at: string;
    dataMigration(object: object): void;
}
