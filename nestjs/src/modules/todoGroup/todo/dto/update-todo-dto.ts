import {PickType} from "@nestjs/mapped-types";
import {Todo} from "../entities/todo.entity";
import {IsBoolean} from "class-validator";

export class UpdateTodoDto extends PickType(
    Todo,
    ['content'] as const
) {
    @IsBoolean()
    readonly done: boolean;
}