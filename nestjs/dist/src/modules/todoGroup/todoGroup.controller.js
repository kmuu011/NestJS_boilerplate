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
exports.TodoGroupController = void 0;
const common_1 = require("@nestjs/common");
const todoGroup_service_1 = require("./todoGroup.service");
const auth_guard_1 = require("../../common/guard/auth.guard");
const create_todoGroup_dto_1 = require("./dto/create-todoGroup-dto");
const select_query_dto_1 = require("../../common/dto/select-query-dto");
const update_todoGroup_dto_1 = require("./dto/update-todoGroup-dto");
const todoGroup_guard_1 = require("./todoGroup.guard");
let TodoGroupController = class TodoGroupController {
    constructor(todoGroupService) {
        this.todoGroupService = todoGroupService;
    }
    async getTodoGroupList(req, query) {
        const { page, count } = query;
        const member = req.locals.memberInfo;
        return await this.todoGroupService.selectList(member, page, count);
    }
    async createGroup(req, body) {
        const member = req.locals.memberInfo;
        return await this.todoGroupService.create(member, body);
    }
    async selectOneTodoGroup(req, todoGroupIdx) {
        return req.locals.todoGroupInfo;
    }
    async updateTodoGroup(req, body, todoGroupIdx) {
        const { memberInfo, todoGroupInfo } = req.res.locals;
        await this.todoGroupService.update(memberInfo, todoGroupInfo, body);
        return { result: true };
    }
    async deleteTodoGroup(req, todoGroupIdx) {
        const { memberInfo, todoGroupInfo } = req.res.locals;
        await this.todoGroupService.delete(memberInfo, todoGroupInfo);
        return { result: true };
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, select_query_dto_1.SelectQueryDto]),
    __metadata("design:returntype", Promise)
], TodoGroupController.prototype, "getTodoGroupList", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_todoGroup_dto_1.CreateTodoGroupDto]),
    __metadata("design:returntype", Promise)
], TodoGroupController.prototype, "createGroup", null);
__decorate([
    (0, common_1.Get)('/:todoGroupIdx(\\d+)'),
    (0, common_1.UseGuards)(todoGroup_guard_1.TodoGroupGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('todoGroupIdx')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], TodoGroupController.prototype, "selectOneTodoGroup", null);
__decorate([
    (0, common_1.Patch)('/:todoGroupIdx(\\d+)'),
    (0, common_1.UseGuards)(todoGroup_guard_1.TodoGroupGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('todoGroupIdx')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_todoGroup_dto_1.UpdateTodoGroupDto, Number]),
    __metadata("design:returntype", Promise)
], TodoGroupController.prototype, "updateTodoGroup", null);
__decorate([
    (0, common_1.Delete)('/:todoGroupIdx(\\d+)'),
    (0, common_1.UseGuards)(todoGroup_guard_1.TodoGroupGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('todoGroupIdx')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], TodoGroupController.prototype, "deleteTodoGroup", null);
TodoGroupController = __decorate([
    (0, common_1.Controller)('/todoGroup'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [todoGroup_service_1.TodoGroupService])
], TodoGroupController);
exports.TodoGroupController = TodoGroupController;
//# sourceMappingURL=todoGroup.controller.js.map