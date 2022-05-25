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
exports.Token = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const member_entity_1 = require("./member.entity");
let Token = class Token extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.idx = undefined;
        this.member = undefined;
        this.token = undefined;
        this.code = undefined;
    }
};
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, typeorm_1.Column)({ primary: true, type: "int", unique: true, unsigned: true }),
    __metadata("design:type", Number)
], Token.prototype, "idx", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => member_entity_1.Member, member => member.tokenInfo, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        nullable: false
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", member_entity_1.Member)
], Token.prototype, "member", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)({ type: 'varchar', length: 1000, comment: '최근 사용 토큰' }),
    __metadata("design:type", String)
], Token.prototype, "token", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)({ type: "varchar", unique: true, length: 50, comment: "유니크 코드" }),
    __metadata("design:type", String)
], Token.prototype, "code", void 0);
Token = __decorate([
    (0, typeorm_1.Entity)({ name: 'member_token' })
], Token);
exports.Token = Token;
//# sourceMappingURL=token.entity.js.map