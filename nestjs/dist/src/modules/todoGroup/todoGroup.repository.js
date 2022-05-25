"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoGroupRepository = void 0;
const typeorm_1 = require("typeorm");
const todoGroup_entity_1 = require("./entities/todoGroup.entity");
const utils_1 = require("../../../libs/utils");
let TodoGroupRepository = class TodoGroupRepository extends typeorm_1.Repository {
    async selectOne(member, todoGroupIdx) {
        return await this.findOne({
            where: { member, idx: todoGroupIdx }
        });
    }
    async selectList(member, page, count) {
        let query = this.createQueryBuilder('tg');
        if (page && count) {
            query = query
                .skip(page - 1)
                .take(count);
        }
        return await query
            .where({ member })
            .orderBy('`order`', "DESC")
            .getManyAndCount();
    }
    async createTodoGroup(todoGroup) {
        return await this.save(todoGroup);
    }
    async updateTodoGroup(todoGroup) {
        const obj = (0, utils_1.getUpdateObject)(["title", "order"], todoGroup, true);
        return await this.update(todoGroup.idx, obj);
    }
    async deleteTodoGroup(todoGroup) {
        return await this.delete(todoGroup.idx);
    }
};
TodoGroupRepository = __decorate([
    (0, typeorm_1.EntityRepository)(todoGroup_entity_1.TodoGroup)
], TodoGroupRepository);
exports.TodoGroupRepository = TodoGroupRepository;
//# sourceMappingURL=todoGroup.repository.js.map