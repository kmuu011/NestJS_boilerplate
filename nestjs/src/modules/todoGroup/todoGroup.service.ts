import {Injectable} from '@nestjs/common';
import {TodoGroupRepository} from "./todoGroup.repository";
import {TodoGroup} from "./entities/todoGroup.entity";
import {Member} from "../member/entities/member.entity";
import {CreateTodoGroupDto} from "./dto/create-todoGroup-dto";
import {SelectQueryDto} from "../../common/dto/select-query-dto";
import {SelectObject} from "../../common/type/type";

@Injectable()
export class TodoGroupService {
    constructor(private readonly todoGroupRepository: TodoGroupRepository) {}

    async getList(member: Member, query: SelectQueryDto): Promise<SelectObject<TodoGroup>> {
        const { page, count } = query;
        const result = await this.todoGroupRepository.select(member, query);

        return {
            items: result[0],
            page,
            count,
            totalCount: result[1],
            last: Math.ceil(result[1] / count) || 1
        };
    }

    async createTodoGroup(member: Member, body: CreateTodoGroupDto): Promise<TodoGroup> {
        const todoGroup: TodoGroup = new TodoGroup();
        todoGroup.dataMigration({
            ...body,
            ...{member}
        });

        todoGroup.order = 1;

        return await this.todoGroupRepository.saveGroup(todoGroup);
    }
}
