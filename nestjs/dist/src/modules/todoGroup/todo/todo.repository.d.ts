import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { Todo } from "./entities/todo.entity";
import { TodoGroup } from "../entities/todoGroup.entity";
import { UpdateTodoDto } from "./dto/update-todo-dto";
export declare class TodoRepository extends Repository<Todo> {
    selectOne(todoGroup: TodoGroup, todoIdx: number): Promise<Todo>;
    selectList(todoGroup: TodoGroup, page?: number, count?: number): Promise<[Todo[], number]>;
    createTodo(todo: Todo): Promise<Todo>;
    updateTodo(todo: Todo, updateTodoDto: UpdateTodoDto): Promise<UpdateResult>;
    deleteTodo(todo: Todo): Promise<DeleteResult>;
}
