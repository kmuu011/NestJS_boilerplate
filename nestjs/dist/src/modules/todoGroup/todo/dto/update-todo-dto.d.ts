import { Todo } from "../entities/todo.entity";
declare const UpdateTodoDto_base: import("@nestjs/mapped-types").MappedType<Pick<Todo, "content">>;
export declare class UpdateTodoDto extends UpdateTodoDto_base {
    readonly complete: boolean;
}
export {};
