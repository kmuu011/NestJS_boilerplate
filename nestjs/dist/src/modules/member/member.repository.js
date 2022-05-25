"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberRepository = void 0;
const member_entity_1 = require("./entities/member.entity");
const typeorm_1 = require("typeorm");
const utils_1 = require("../../../libs/utils");
const memberSelectKeys = ["idx", "id", "nickname", "email", "admin", "profile_img_key", "auth_type", "ip", "user_agent", "created_at"];
const memberUpdateKeys = ["nickname", "email", "profile_img_key", "ip", "user_agent", "password"];
let MemberRepository = class MemberRepository extends typeorm_1.Repository {
    async select(member, selectKeys, includePassword) {
        if (selectKeys === undefined)
            selectKeys = "idx";
        const selectKeysList = selectKeys.replace(/\s/g, '').split(',');
        const where = {};
        for (const k of selectKeysList) {
            where[k] = member[k];
        }
        const additionalKeys = [];
        if (includePassword === true) {
            additionalKeys.push('password');
        }
        return await this.findOne({
            select: [...memberSelectKeys, ...additionalKeys],
            relations: ["tokenInfo"],
            where
        });
    }
    async login(member) {
        const { id, password } = member;
        return await this.findOne({
            select: memberSelectKeys,
            relations: ["tokenInfo"],
            where: { id, password }
        });
    }
    async signUp(member) {
        const { id, password, nickname, email } = member;
        return await this.save({
            id,
            password,
            nickname,
            email
        });
    }
    async updateMember(member) {
        const obj = (0, utils_1.getUpdateObject)(memberUpdateKeys, member, true);
        return await this.update(member.idx, obj);
    }
    async duplicateCheck(type, value) {
        return await this.findOne({
            [type]: value
        });
    }
};
MemberRepository = __decorate([
    (0, typeorm_1.EntityRepository)(member_entity_1.Member)
], MemberRepository);
exports.MemberRepository = MemberRepository;
//# sourceMappingURL=member.repository.js.map