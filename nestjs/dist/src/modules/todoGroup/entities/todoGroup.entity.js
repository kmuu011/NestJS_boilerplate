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
var TodoGroup_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoGroup = void 0;
const class_validator_1 = require("class-validator");
const member_entity_1 = require("../../member/entities/member.entity");
const typeorm_1 = require("typeorm");
const todo_entity_1 = require("../todo/entities/todo.entity");
let TodoGroup = TodoGroup_1 = class TodoGroup extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.idx = undefined;
        this.member = undefined;
        this.title = undefined;
        this.order = undefined;
        this.todoList = undefined;
        this.created_at = undefined;
        this.updated_at = undefined;
    }
    dataMigration(object) {
        for (let k in new TodoGroup_1()) {
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
], TodoGroup.prototype, "idx", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => member_entity_1.Member, member => member.todoGroupList, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        nullable: false
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", member_entity_1.Member)
], TodoGroup.prototype, "member", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, comment: '할일 그룹 제목' }),
    __metadata("design:type", String)
], TodoGroup.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, typeorm_1.Column)({ type: "tinyint", default: 1, comment: "순서" }),
    __metadata("design:type", Number)
], TodoGroup.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => todo_entity_1.Todo, todo => todo.todoGroup, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], TodoGroup.prototype, "todoList", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, typeorm_1.Column)({ type: "timestamp", default: () => "now", comment: "생성 일자" }),
    __metadata("design:type", String)
], TodoGroup.prototype, "created_at", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, typeorm_1.Column)({ type: "timestamp", default: () => "now", comment: "수정 일자" }),
    __metadata("design:type", String)
], TodoGroup.prototype, "updated_at", void 0);
TodoGroup = TodoGroup_1 = __decorate([
    (0, typeorm_1.Entity)({ name: 'todo_group' })
], TodoGroup);
exports.TodoGroup = TodoGroup;
//# sourceMappingURL=todoGroup.entity.js.map