import {EntityRepository, Repository} from "typeorm";
import {TodoGroup} from "./entities/todoGroup.entity";
import {Member} from "../member/entities/member.entity";
import {SelectQueryDto} from "../../common/dto/select-query-dto";

@EntityRepository(TodoGroup)
export class TodoGroupRepository extends Repository<TodoGroup> {
    async select(member: Member, query: SelectQueryDto): Promise<[TodoGroup[], number]> {
        const { page, count } = query;

        return await this.createQueryBuilder('tg')
            .where({member})
            .skip(page-1)
            .take(count)
            .getManyAndCount();
    }

    async saveGroup(todoGroup: TodoGroup): Promise<TodoGroup> {
        return await this.save(todoGroup);
    }

}