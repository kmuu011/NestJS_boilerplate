import { SelectListResponseType } from "../../../common/type/type";
import { TodoRepository } from "./todo.repository";
import { Todo } from "./entities/todo.entity";
import { TodoGroup } from "../entities/todoGroup.entity";
import { CreateTodoDto } from "./dto/create-todo-dto";
import { UpdateTodoDto } from "./dto/update-todo-dto";
export declare class TodoService {
    private readonly todoRepository;
    constructor(todoRepository: TodoRepository);
    selectOne(todoGroup: TodoGroup, todoIdx: number): Promise<Todo>;
    selectList(todoGroup: TodoGroup, page: number, count: number): Promise<SelectListResponseType<Todo>>;
    create(todoGroup: TodoGroup, createTodoDto: CreateTodoDto): Promise<Todo>;
    update(todo: Todo, updateTodoDto: UpdateTodoDto): Promise<void>;
    delete(todo: Todo): Promise<void>;
}
