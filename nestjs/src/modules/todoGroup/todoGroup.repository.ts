import {DeleteResult, EntityRepository, Repository, UpdateResult} from "typeorm";
import {TodoGroup} from "./entities/todoGroup.entity";
import {Member} from "../member/entities/member.entity";
import {getUpdateObject} from "libs/utils";

@EntityRepository(TodoGroup)
export class TodoGroupRepository extends Repository<TodoGroup> {

    async selectOne(member: Member, todoGroupIdx: number) {
        return await this.findOne({
            where: {member, idx: todoGroupIdx}
        });
    }

    async selectList(member: Member, page?: number, count?: number): Promise<[TodoGroup[], number]> {
        let query = this.createQueryBuilder('tg');

        if(page && count){
            query = query
                .skip(page-1)
                .take(count);
        }

        return await query
            .where({member})
            .orderBy('`order`')
            .getManyAndCount();
    }

    async saveTodoGroup(todoGroup: TodoGroup): Promise<TodoGroup> {
        return await this.save(todoGroup);
    }

    async updateTodoGroup(todoGroup: TodoGroup): Promise<UpdateResult> {
        const obj = getUpdateObject(["title"], todoGroup, true);

        return await this.update(todoGroup.idx, obj);
    }

    async deleteTodoGroup(todoGroup: TodoGroup): Promise<DeleteResult> {
        return await this.delete(todoGroup.idx);
    }

}