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
exports.TodoService = void 0;
const common_1 = require("@nestjs/common");
const todo_repository_1 = require("./todo.repository");
const todo_entity_1 = require("./entities/todo.entity");
const message_1 = require("../../../../libs/message");
let TodoService = class TodoService {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }
    async selectOne(todoGroup, todoIdx) {
        return await this.todoRepository.selectOne(todoGroup, todoIdx);
    }
    async selectList(todoGroup, page, count) {
        const result = await this.todoRepository.selectList(todoGroup, page, count);
        return {
            items: result[0],
            page,
            count,
            totalCount: result[1],
            last: Math.ceil(result[1] / count) || 1
        };
    }
    async create(todoGroup, createTodoDto) {
        const todo = new todo_entity_1.Todo();
        todo.dataMigration(createTodoDto);
        todo.todoGroup = todoGroup;
        return this.todoRepository.createTodo(todo);
    }
    async update(todo, updateTodoDto) {
        todo.dataMigration(updateTodoDto);
        const updateResult = await this.todoRepository.updateTodo(todo, updateTodoDto);
        if (updateResult.affected !== 1) {
            throw message_1.Message.SERVER_ERROR;
        }
    }
    async delete(todo) {
        const deleteResult = await this.todoRepository.deleteTodo(todo);
        if (deleteResult.affected !== 1) {
            throw message_1.Message.SERVER_ERROR;
        }
    }
};
TodoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [todo_repository_1.TodoRepository])
], TodoService);
exports.TodoService = TodoService;
//# sourceMappingURL=todo.service.js.map