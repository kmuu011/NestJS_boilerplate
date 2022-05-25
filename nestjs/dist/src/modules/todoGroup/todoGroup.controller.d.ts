import { TodoGroupService } from './todoGroup.service';
import { Request } from "express";
import { CreateTodoGroupDto } from "./dto/create-todoGroup-dto";
import { SelectQueryDto } from "../../common/dto/select-query-dto";
import { UpdateTodoGroupDto } from "./dto/update-todoGroup-dto";
import { TodoGroup } from "./entities/todoGroup.entity";
import { ResponseBooleanType, SelectListResponseType } from "../../common/type/type";
export declare class TodoGroupController {
    private readonly todoGroupService;
    constructor(todoGroupService: TodoGroupService);
    getTodoGroupList(req: Request, query: SelectQueryDto): Promise<SelectListResponseType<TodoGroup>>;
    createGroup(req: Request, body: CreateTodoGroupDto): Promise<TodoGroup>;
    selectOneTodoGroup(req: Request, todoGroupIdx: number): Promise<TodoGroup>;
    updateTodoGroup(req: Request, body: UpdateTodoGroupDto, todoGroupIdx: number): Promise<ResponseBooleanType>;
    deleteTodoGroup(req: Request, todoGroupIdx: number): Promise<ResponseBooleanType>;
}
