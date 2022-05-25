import { CanActivate, ExecutionContext } from '@nestjs/common';
import { TodoRepository } from "./todo.repository";
export declare class TodoGuard implements CanActivate {
    private todoRepository;
    constructor(todoRepository: TodoRepository);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
