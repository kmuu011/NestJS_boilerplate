"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoGroupService = void 0;
const common_1 = require("@nestjs/common");
const todoGroup_repository_1 = require("./todoGroup.repository");
const todoGroup_entity_1 = require("./entities/todoGroup.entity");
const message_1 = require("../../../libs/message");
let TodoGroupService = class TodoGroupService {
    constructor(todoGroupRepository) {
        this.todoGroupRepository = todoGroupRepository;
    }
    async arrangeOrder(member, todoGroup, order) {
        const todoGroupList = (await this.todoGroupRepository.selectList(member))[0];
        let splicedTodoGroupList = [...todoGroupList];
        if (todoGroup) {
            splicedTodoGroupList.splice(todoGroupList.findIndex(v => v.idx === todoGroup.idx), 1);
            if (order === 1) {
                splicedTodoGroupList.push(todoGroup);
            }
            else if (order === todoGroupList.length) {
                splicedTodoGroupList.unshift(todoGroup);
            }
            else {
                const targetIdx = todoGroupList.findIndex(v => v.order === order);
                splicedTodoGroupList = [...splicedTodoGroupList.slice(0, targetIdx), todoGroup, ...splicedTodoGroupList.slice(targetIdx, splicedTodoGroupList.length)];
            }
        }
        for (let i = 0; i < splicedTodoGroupList.length; i++) {
            splicedTodoGroupList[i].order = splicedTodoGroupList.length - i;
            const updateResult = await this.todoGroupRepository.updateTodoGroup(splicedTodoGroupList[i]);
            if (updateResult.affected !== 1) {
                throw message_1.Message.SERVER_ERROR;
            }
        }
    }
    async selectOne(member, todoGroupIdx) {
        return await this.todoGroupRepository.selectOne(member, todoGroupIdx);
    }
    async selectList(member, page, count) {
        const result = await this.todoGroupRepository.selectList(member, page, count);
        return {
            items: result[0],
            page,
            count,
            totalCount: result[1],
            last: Math.ceil(result[1] / count) || 1
        };
    }
    async create(member, body) {
        const todoGroup = new todoGroup_entity_1.TodoGroup();
        todoGroup.dataMigration(Object.assign(Object.assign({}, body), { member }));
        todoGroup.order = (await this.todoGroupRepository.selectList(member))[1] + 1;
        await this.arrangeOrder(member);
        return await this.todoGroupRepository.createTodoGroup(todoGroup);
    }
    async update(member, todoGroup, body) {
        todoGroup.title = body.title;
        const updateResult = await this.todoGroupRepository.updateTodoGroup(todoGroup);
        if (updateResult.affected !== 1) {
            throw message_1.Message.SERVER_ERROR;
        }
        if (todoGroup.order !== body.order && body.order !== undefined) {
            await this.arrangeOrder(member, todoGroup, body.order);
        }
    }
    async delete(member, todoGroup) {
        const deleteResult = await this.todoGroupRepository.deleteTodoGroup(todoGroup);
        if (deleteResult.affected !== 1) {
            throw message_1.Message.SERVER_ERROR;
        }
        await this.arrangeOrder(member);
    }
};
TodoGroupService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [todoGroup_repository_1.TodoGroupRepository])
], TodoGroupService);
exports.TodoGroupService = TodoGroupService;
//# sourceMappingURL=todoGroup.service.js.map