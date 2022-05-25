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
exports.TodoGuard = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const todo_repository_1 = require("./todo.repository");
const message_1 = require("../../../../libs/message");
let TodoGuard = class TodoGuard {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const todoGroupInfo = req.locals.todoGroupInfo;
        const todoIdx = Number(req.params.todoIdx);
        const todoInfo = await this.todoRepository.selectOne(todoGroupInfo, todoIdx);
        if (!todoInfo) {
            throw message_1.Message.NOT_EXIST('todo');
        }
        req.locals.todoInfo = todoInfo;
        return true;
    }
};
TodoGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(todo_repository_1.TodoRepository)),
    __metadata("design:paramtypes", [todo_repository_1.TodoRepository])
], TodoGuard);
exports.TodoGuard = TodoGuard;
//# sourceMappingURL=todo.guard.js.map