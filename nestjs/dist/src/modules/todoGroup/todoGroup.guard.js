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
exports.TodoGroupGuard = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const message_1 = require("../../../libs/message");
const todoGroup_repository_1 = require("./todoGroup.repository");
let TodoGroupGuard = class TodoGroupGuard {
    constructor(todoGroupRepository) {
        this.todoGroupRepository = todoGroupRepository;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const memberInfo = req.locals.memberInfo;
        const todoGroupIdx = Number(req.params.todoGroupIdx);
        const todoGroupInfo = await this.todoGroupRepository.selectOne(memberInfo, todoGroupIdx);
        if (!todoGroupInfo) {
            throw message_1.Message.NOT_EXIST('todoGroup');
        }
        req.locals.todoGroupInfo = todoGroupInfo;
        return true;
    }
};
TodoGroupGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(todoGroup_repository_1.TodoGroupRepository)),
    __metadata("design:paramtypes", [todoGroup_repository_1.TodoGroupRepository])
], TodoGroupGuard);
exports.TodoGroupGuard = TodoGroupGuard;
//# sourceMappingURL=todoGroup.guard.js.map