import {PickType} from "@nestjs/mapped-types";
import {TodoGroup} from "../entities/todoGroup.entity";

export class UpdateTodoGroupDto extends PickType(
    TodoGroup,
    ['title'] as const
) {}