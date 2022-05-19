import {PickType} from "@nestjs/mapped-types";
import {TodoGroup} from "../entities/todoGroup.entity";

export class CreateTodoGroupDto extends PickType(
    TodoGroup,
    ['title'] as const
) {}