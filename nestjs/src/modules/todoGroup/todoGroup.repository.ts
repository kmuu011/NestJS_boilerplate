import {DeleteResult, EntityRepository, Repository} from "typeorm";
import {TodoGroup} from "./entities/todoGroup.entity";
import {Member} from "../member/entities/member.entity";

@EntityRepository(TodoGroup)
export class TodoGroupRepository extends Repository<TodoGroup> {

    async selectOne(member: Member, todoGroupIdx: number) {
        return await this.findOne({
            where: {member, idx: todoGroupIdx}
        });
    }

    async select(member: Member, page: number, count: number): Promise<[TodoGroup[], number]> {
        return await this.createQueryBuilder('tg')
            .where({member})
            .skip(page-1)
            .take(count)
            .getManyAndCount();
    }

    async saveTodoGroup(todoGroup: TodoGroup): Promise<TodoGroup> {
        return await this.save(todoGroup);
    }

    async deleteTodoGroup(todoGroup: TodoGroup): Promise<DeleteResult> {
        return await this.delete(todoGroup.idx);
    }

}