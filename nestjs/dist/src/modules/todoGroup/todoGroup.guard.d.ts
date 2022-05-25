import { CanActivate, ExecutionContext } from '@nestjs/common';
import { TodoGroupRepository } from "./todoGroup.repository";
export declare class TodoGroupGuard implements CanActivate {
    private todoGroupRepository;
    constructor(todoGroupRepository: TodoGroupRepository);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
