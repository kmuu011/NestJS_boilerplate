import {DeleteResult, EntityRepository, Repository, UpdateResult} from "typeorm";
import {Todo} from "./entities/todo.entity";
import {TodoGroup} from "../entities/todoGroup.entity";

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {

    async selectOne(todoGroup: TodoGroup, todoIdx: number): Promise<Todo> {
        return await this.findOne({
            where: {todoGroup, idx: todoIdx}
        });
    }

    async selectList(todoGroup: TodoGroup, page?: number, count?: number) {
        let query = this.createQueryBuilder('t');

        if(page && count){
            query = query
                .skip(page-1)
                .take(count);
        }

        return await query
            .where({todoGroup})
            .orderBy('created_at')
            .getManyAndCount();
    }

    async createTodo(todo: Todo): Promise<Todo> {
        return await this.save(todo)
    }


}