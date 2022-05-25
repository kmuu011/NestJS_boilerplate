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
var Todo_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const todoGroup_entity_1 = require("../../entities/todoGroup.entity");
let Todo = Todo_1 = class Todo extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.idx = undefined;
        this.todoGroup = undefined;
        this.content = undefined;
        this.created_at = undefined;
        this.updated_at = undefined;
        this.completed_at = undefined;
    }
    dataMigration(object) {
        for (let k in new Todo_1()) {
            if (object[k] === undefined)
                continue;
            this[k] = object[k];
        }
    }
};
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, typeorm_1.Column)({ primary: true, type: "int", unique: true, unsigned: true }),
    __metadata("design:type", Number)
], Todo.prototype, "idx", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => todoGroup_entity_1.TodoGroup, todoGroup => todoGroup.todoList, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        nullable: false
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", todoGroup_entity_1.TodoGroup)
], Todo.prototype, "todoGroup", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)({ type: 'varchar', length: 300, comment: '할일 내용' }),
    __metadata("design:type", String)
], Todo.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, typeorm_1.Column)({ type: "timestamp", default: () => "now", comment: "생성 일자" }),
    __metadata("design:type", String)
], Todo.prototype, "created_at", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, typeorm_1.Column)({ type: "timestamp", default: () => "now", comment: "수정 일자" }),
    __metadata("design:type", String)
], Todo.prototype, "updated_at", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true, comment: "완료 일자" }),
    __metadata("design:type", String)
], Todo.prototype, "completed_at", void 0);
Todo = Todo_1 = __decorate([
    (0, typeorm_1.Entity)({ name: 'todo' })
], Todo);
exports.Todo = Todo;
//# sourceMappingURL=todo.entity.js.map