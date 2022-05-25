import { Request } from "express";
import { TodoGroupService } from "../todoGroup.service";
import { TodoService } from "./todo.service";
import { SelectQueryDto } from "../../../common/dto/select-query-dto";
import { CreateTodoDto } from "./dto/create-todo-dto";
import { Todo } from "./entities/todo.entity";
import { UpdateTodoDto } from "./dto/update-todo-dto";
import { ResponseBooleanType, SelectListResponseType } from "../../../common/type/type";
export declare class TodoController {
    private readonly todoGroupService;
    private readonly todoService;
    constructor(todoGroupService: TodoGroupService, todoService: TodoService);
    selectList(req: Request, query: SelectQueryDto): Promise<SelectListResponseType<Todo>>;
    createTodo(req: Request, body: CreateTodoDto): Promise<Todo>;
    updateTodo(req: Request, body: UpdateTodoDto): Promise<ResponseBooleanType>;
    deleteTodo(req: Request): Promise<ResponseBooleanType>;
}
