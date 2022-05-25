import { TodoGroup } from "../entities/todoGroup.entity";
declare const CreateTodoGroupDto_base: import("@nestjs/mapped-types").MappedType<Pick<TodoGroup, "title">>;
export declare class CreateTodoGroupDto extends CreateTodoGroupDto_base {
}
export {};
