import {PickType} from "@nestjs/mapped-types";
import {TodoGroup} from "../entities/todoGroup.entity";
import {IsNumber, IsOptional} from "class-validator";

export class UpdateTodoGroupDto extends PickType(
    TodoGroup,
    ['title'] as const
) {

    @IsNumber()
    @IsOptional()
    readonly order: number;
}