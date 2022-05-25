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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../../../common/guard/auth.guard");
const todoGroup_service_1 = require("../todoGroup.service");
const todo_service_1 = require("./todo.service");
const select_query_dto_1 = require("../../../common/dto/select-query-dto");
const create_todo_dto_1 = require("./dto/create-todo-dto");
const update_todo_dto_1 = require("./dto/update-todo-dto");
const todoGroup_guard_1 = require("../todoGroup.guard");
const todo_guard_1 = require("./todo.guard");
let TodoController = class TodoController {
    constructor(todoGroupService, todoService) {
        this.todoGroupService = todoGroupService;
        this.todoService = todoService;
    }
    async selectList(req, query) {
        const { page, count } = query;
        const todoGroupInfo = req.locals.todoGroupInfo;
        return await this.todoService.selectList(todoGroupInfo, page, count);
    }
    async createTodo(req, body) {
        const todoGroup = req.locals.todoGroupInfo;
        return await this.todoService.create(todoGroup, body);
    }
    async updateTodo(req, body) {
        const todoInfo = req.locals.todoInfo;
        await this.todoService.update(todoInfo, body);
        return { result: true };
    }
    async deleteTodo(req) {
        const todoInfo = req.locals.todoInfo;
        await this.todoService.delete(todoInfo);
        return { result: true };
    }
};
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, select_query_dto_1.SelectQueryDto]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "selectList", null);
__decorate([
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_todo_dto_1.CreateTodoDto]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "createTodo", null);
__decorate([
    (0, common_1.Patch)('/:todoIdx(\\d+)'),
    (0, common_1.UseGuards)(todo_guard_1.TodoGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_todo_dto_1.UpdateTodoDto]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "updateTodo", null);
__decorate([
    (0, common_1.Delete)('/:todoIdx(\\d+)'),
    (0, common_1.UseGuards)(todo_guard_1.TodoGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "deleteTodo", null);
TodoController = __decorate([
    (0, common_1.Controller)('/todoGroup/:todoGroupIdx(\\d+)/todo'),
    (0, common_1.UseGuards)(todoGroup_guard_1.TodoGroupGuard),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [todoGroup_service_1.TodoGroupService,
        todo_service_1.TodoService])
], TodoController);
exports.TodoController = TodoController;
//# sourceMappingURL=todo.controller.js.map