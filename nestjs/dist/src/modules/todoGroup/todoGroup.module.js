"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoGroupModule = void 0;
const common_1 = require("@nestjs/common");
const todoGroup_controller_1 = require("./todoGroup.controller");
const todoGroup_service_1 = require("./todoGroup.service");
const todo_module_1 = require("./todo/todo.module");
const typeorm_1 = require("@nestjs/typeorm");
const todoGroup_repository_1 = require("./todoGroup.repository");
let TodoGroupModule = class TodoGroupModule {
};
TodoGroupModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                todoGroup_repository_1.TodoGroupRepository,
            ]),
            todo_module_1.TodoModule
        ],
        controllers: [todoGroup_controller_1.TodoGroupController],
        providers: [todoGroup_service_1.TodoGroupService],
        exports: [
            typeorm_1.TypeOrmModule.forFeature([
                todoGroup_repository_1.TodoGroupRepository,
            ]),
            todoGroup_service_1.TodoGroupService,
        ]
    })
], TodoGroupModule);
exports.TodoGroupModule = TodoGroupModule;
//# sourceMappingURL=todoGroup.module.js.map