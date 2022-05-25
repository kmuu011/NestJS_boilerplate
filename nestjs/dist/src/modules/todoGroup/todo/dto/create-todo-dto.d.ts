import { Todo } from "../entities/todo.entity";
declare const CreateTodoDto_base: import("@nestjs/mapped-types").MappedType<Pick<Todo, "content">>;
export declare class CreateTodoDto extends CreateTodoDto_base {
}
export {};
