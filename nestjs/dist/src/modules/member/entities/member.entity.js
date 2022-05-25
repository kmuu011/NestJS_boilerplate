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
var Member_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Member = void 0;
const class_validator_1 = require("class-validator");
const token_entity_1 = require("./token.entity");
const typeorm_1 = require("typeorm");
const member_1 = require("../../../../libs/member");
const todoGroup_entity_1 = require("../../todoGroup/entities/todoGroup.entity");
let Member = Member_1 = class Member extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.idx = undefined;
        this.id = undefined;
        this.password = undefined;
        this.password_encrypted = undefined;
        this.nickname = undefined;
        this.email = undefined;
        this.profile_img_key = undefined;
        this.admin = undefined;
        this.created_at = undefined;
        this.updated_at = undefined;
        this.auth_type = undefined;
        this.auth_id = undefined;
        this.ip = undefined;
        this.user_agent = undefined;
        this.keep_check = undefined;
    }
    passwordEncrypt() {
        if (this.password_encrypted !== true) {
            this.password = (0, member_1.encryptPassword)(this.password);
            this.password_encrypted = true;
        }
    }
    getPayload() {
        return {
            idx: this.idx,
            id: this.id,
            nickname: this.nickname,
            ip: this.ip,
            user_agent: this.user_agent,
            keep_check: this.keep_check,
            created_at: this.created_at,
            time: Date.now()
        };
    }
    createToken() {
        return (0, member_1.createToken)(this.getPayload());
    }
    async decodeToken() {
        return (0, member_1.decodeToken)(this.tokenInfo.token);
    }
    dataMigration(object) {
        for (let k in new Member_1()) {
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
], Member.prototype, "idx", void 0);
__decorate([
    (0, class_validator_1.NotContains)('어드민'),
    (0, class_validator_1.NotContains)('admin'),
    (0, class_validator_1.NotContains)('테스트'),
    (0, class_validator_1.NotContains)('test'),
    (0, class_validator_1.NotContains)('관리자'),
    (0, class_validator_1.Length)(3, 15),
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, unique: true, comment: '유저 아이디' }),
    __metadata("design:type", String)
], Member.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)({ type: 'varchar', length: 200, comment: '유저 비밀번호' }),
    __metadata("design:type", String)
], Member.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], Member.prototype, "password_encrypted", void 0);
__decorate([
    (0, class_validator_1.NotContains)('어드민'),
    (0, class_validator_1.NotContains)('admin'),
    (0, class_validator_1.NotContains)('테스트'),
    (0, class_validator_1.NotContains)('test'),
    (0, class_validator_1.NotContains)('관리자'),
    (0, class_validator_1.Length)(2, 20),
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, comment: '유저 닉네임' }),
    __metadata("design:type", String)
], Member.prototype, "nickname", void 0);
__decorate([
    (0, class_validator_1.NotContains)('어드민'),
    (0, class_validator_1.NotContains)('admin'),
    (0, class_validator_1.NotContains)('테스트'),
    (0, class_validator_1.NotContains)('test'),
    (0, class_validator_1.NotContains)('관리자'),
    (0, class_validator_1.IsEmail)(),
    (0, typeorm_1.Column)({ type: 'varchar', length: 150, unique: true, comment: '유저 이메일' }),
    __metadata("design:type", String)
], Member.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)({ type: 'varchar', length: 200, nullable: true, comment: '유저 프로필 이미지 키' }),
    __metadata("design:type", String)
], Member.prototype, "profile_img_key", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, typeorm_1.Column)({ type: 'tinyint', default: 0, unsigned: true, comment: '관리자 유무' }),
    __metadata("design:type", Number)
], Member.prototype, "admin", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => "now", comment: '회원가입 일자' }),
    __metadata("design:type", String)
], Member.prototype, "created_at", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => "now", comment: '수정 일자' }),
    __metadata("design:type", String)
], Member.prototype, "updated_at", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, typeorm_1.Column)({ type: 'tinyint', default: 0, comment: '가입 유형' }),
    __metadata("design:type", Number)
], Member.prototype, "auth_type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true, comment: '소셜 가입 유니크 키' }),
    __metadata("design:type", String)
], Member.prototype, "auth_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)({ type: 'varchar', length: 30, nullable: true, comment: '접속 IP' }),
    __metadata("design:type", String)
], Member.prototype, "ip", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)({ type: 'varchar', length: 400, nullable: true, comment: '접속 환경' }),
    __metadata("design:type", String)
], Member.prototype, "user_agent", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], Member.prototype, "keep_check", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => token_entity_1.Token, token => token.member),
    __metadata("design:type", token_entity_1.Token)
], Member.prototype, "tokenInfo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => todoGroup_entity_1.TodoGroup, todoGroup => todoGroup.member),
    __metadata("design:type", Array)
], Member.prototype, "todoGroupList", void 0);
Member = Member_1 = __decorate([
    (0, typeorm_1.Entity)({ name: 'member' })
], Member);
exports.Member = Member;
//# sourceMappingURL=member.entity.js.map