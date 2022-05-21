import {PickType} from "@nestjs/mapped-types";
import {Todo} from "../entities/todo.entity";
import {IsBoolean, IsOptional} from "class-validator";

export class UpdateTodoDto extends PickType(
    Todo,
    ['content'] as const
) {
    @IsBoolean()
    @IsOptional()
    readonly complete: boolean;
}