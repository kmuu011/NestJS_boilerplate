import { TodoGroup } from "../entities/todoGroup.entity";
declare const UpdateTodoGroupDto_base: import("@nestjs/mapped-types").MappedType<Pick<TodoGroup, "title">>;
export declare class UpdateTodoGroupDto extends UpdateTodoGroupDto_base {
    readonly order: number;
}
export {};
