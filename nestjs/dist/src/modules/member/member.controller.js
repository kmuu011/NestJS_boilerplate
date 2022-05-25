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
exports.MemberController = void 0;
const common_1 = require("@nestjs/common");
const member_service_1 = require("./member.service");
const login_member_dto_1 = require("./dto/login-member.dto");
const create_member_dto_1 = require("./dto/create-member-dto");
const duplicate_check_member_dto_1 = require("./dto/duplicate-check-member.dto");
const auth_guard_1 = require("../../common/guard/auth.guard");
const update_member_dto_1 = require("./dto/update-member.dto");
const platform_express_1 = require("@nestjs/platform-express");
const config_1 = require("../../../config/config");
const validator = require("../../../libs/validator");
const message_1 = require("../../../libs/message");
const duplicateCheckKeys = ['id', 'nickname', 'email'];
let MemberController = class MemberController {
    constructor(memberService) {
        this.memberService = memberService;
    }
    async auth(req) {
        const memberInfo = req.locals.memberInfo;
        console.log(memberInfo);
        throw message_1.Message.SERVER_ERROR;
        return memberInfo;
    }
    async login(req, loginMemberDto) {
        const member = await this.memberService.login(loginMemberDto, req.headers);
        return {
            tokenCode: member.tokenInfo.code
        };
    }
    async signUp(createMemberDto) {
        for (const key of duplicateCheckKeys) {
            const usable = await this.memberService.duplicateCheck(key, createMemberDto[key]);
            if (!usable) {
                throw message_1.Message.ALREADY_EXIST(key);
            }
        }
        await this.memberService.signUp(createMemberDto);
        return {
            result: true
        };
    }
    async updateMember(req, updateMemberDto) {
        const memberInfo = req.locals.memberInfo;
        for (const key of duplicateCheckKeys) {
            if (key === 'id')
                continue;
            const usable = await this.memberService.duplicateCheck(key, updateMemberDto[key]);
            if (!usable && memberInfo[key] !== updateMemberDto[key]) {
                throw message_1.Message.ALREADY_EXIST(key);
            }
        }
        if (memberInfo.auth_type === 0 && updateMemberDto.originalPassword === undefined) {
            throw message_1.Message.INVALID_PARAM('originalPassword');
        }
        await this.memberService.updateMember(updateMemberDto, memberInfo);
        return {
            result: true
        };
    }
    async img(req, file) {
        const arrangedFile = (validator.file([file], 10, validator.type.img))[0];
        await this.memberService.imgUpdate(arrangedFile, req.locals.memberInfo);
        return {
            result: true
        };
    }
    async deleteImg(req) {
        await this.memberService.imgDelete(req.locals.memberInfo);
        return {
            result: true
        };
    }
    async getImg(req, res) {
        const member = req.locals.memberInfo;
        const profileImgKey = member.profile_img_key;
        res.download(config_1.basePath + profileImgKey, 'test.jpg');
    }
    async duplicateCheck(duplicateCheckDto) {
        const { type, value } = duplicateCheckDto;
        return {
            usable: await this.memberService.duplicateCheck(duplicateCheckKeys[type], value)
        };
    }
};
__decorate([
    (0, common_1.Post)('/auth'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "auth", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, login_member_dto_1.LoginMemberDto]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/signUp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_member_dto_1.CreateMemberDto]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "signUp", null);
__decorate([
    (0, common_1.Patch)('/'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_member_dto_1.UpdateMemberDto]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "updateMember", null);
__decorate([
    (0, common_1.Patch)('img'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', config_1.multerOptions)),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "img", null);
__decorate([
    (0, common_1.Delete)('img'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "deleteImg", null);
__decorate([
    (0, common_1.Get)('img'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "getImg", null);
__decorate([
    (0, common_1.Get)('/duplicateCheck'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [duplicate_check_member_dto_1.DuplicateCheckMemberDto]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "duplicateCheck", null);
MemberController = __decorate([
    (0, common_1.Controller)('/member'),
    __metadata("design:paramtypes", [member_service_1.MemberService])
], MemberController);
exports.MemberController = MemberController;
//# sourceMappingURL=member.controller.js.map