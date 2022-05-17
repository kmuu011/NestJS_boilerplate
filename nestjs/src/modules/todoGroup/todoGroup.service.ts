import {Injectable} from '@nestjs/common';
import {TodoGroupRepository} from "./todoGroup.repository";
import {TodoGroup} from "./entities/todoGroup.entity";
import {Member} from "../member/entities/member.entity";
import {CreateTodoGroupDto} from "./dto/create-todoGroup-dto";
import {SelectObject} from "../../common/type/type";
import {DeleteResult, UpdateResult} from "typeorm";
import {Message} from "libs/message";

@Injectable()
export class TodoGroupService {
    constructor(private readonly todoGroupRepository: TodoGroupRepository) {
    }

    async selectOne(member: Member, todoGroupIdx: number) {
        return await this.todoGroupRepository.selectOne(member, todoGroupIdx);
    }

    async getList(member: Member, page: number, count: number): Promise<SelectObject<TodoGroup>> {
        const result = await this.todoGroupRepository.select(member, page, count);

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

        todoGroup.order = (await this.todoGroupRepository.select(member, 1, 1))[1] + 1;

        return await this.todoGroupRepository.saveTodoGroup(todoGroup);
    }

    async updateTodoGroup(todoGroup: TodoGroup) {
        const updateResult: UpdateResult = await this.todoGroupRepository.updateTodoGroup(todoGroup);

        if(updateResult.affected !== 1){
            throw Message.SERVER_ERROR;
        }
    }

    async deleteTodoGroup(todoGroup: TodoGroup): Promise<void> {
        const deleteResult: DeleteResult = await this.todoGroupRepository.deleteTodoGroup(todoGroup);

        if (deleteResult.affected !== 1) {
            throw Message.SERVER_ERROR;
        }
    }

}
