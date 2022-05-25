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
exports.MemberService = void 0;
const common_1 = require("@nestjs/common");
const member_repository_1 = require("./member.repository");
const member_entity_1 = require("./entities/member.entity");
const typeorm_1 = require("@nestjs/typeorm");
const message_1 = require("../../../libs/message");
const token_repository_1 = require("./token/token.repository");
const utils_1 = require("../../../libs/utils");
const fs_1 = require("fs");
const fs = require("fs");
const member_1 = require("../../../libs/member");
const config_1 = require("../../../config/config");
let MemberService = class MemberService {
    constructor(memberRepository, tokenRepository) {
        this.memberRepository = memberRepository;
        this.tokenRepository = tokenRepository;
    }
    async auth(headers) {
        const member = new member_entity_1.Member();
        member.dataMigration({
            user_agent: headers["user_agent"],
            ip: headers["ip"]
        });
        await member.decodeToken();
    }
    async select(member) {
        return this.memberRepository.select(member);
    }
    async login(loginMemberDto, headers) {
        const member = new member_entity_1.Member();
        const { ip, "user-agent": user_agent } = headers;
        member.dataMigration(loginMemberDto);
        member.passwordEncrypt();
        const loginResult = await this.memberRepository.select(member, 'id, password');
        if (!loginResult) {
            throw message_1.Message.WRONG_ID_OR_PASSWORD;
        }
        member.dataMigration(Object.assign(Object.assign({}, loginResult), { ip, user_agent }));
        const newToken = member.createToken();
        const code = await (0, utils_1.createKey)(this.tokenRepository, 'code', 40);
        member.tokenInfo = await this.tokenRepository.saveToken(member, newToken, code);
        await this.memberRepository.updateMember(member);
        return member;
    }
    ;
    async signUp(createMemberDto) {
        const member = new member_entity_1.Member();
        member.dataMigration(createMemberDto);
        member.passwordEncrypt();
        const result = await this.memberRepository.signUp(member);
        if (!result) {
            throw message_1.Message.SERVER_ERROR;
        }
    }
    async duplicateCheck(key, value) {
        return !(await this.memberRepository.duplicateCheck(key, value));
    }
    async updateMember(updateMemberDto, member) {
        const memberInfo = await this.memberRepository.select(member, undefined, true);
        if (memberInfo.auth_type === 0) {
            updateMemberDto.originalPassword = (0, member_1.encryptPassword)(updateMemberDto.originalPassword);
            if (updateMemberDto.originalPassword !== memberInfo.password) {
                throw message_1.Message.CUSTOM_ERROR("기존 비밀번호가 틀립니다.");
            }
            if (updateMemberDto.password !== undefined) {
                updateMemberDto.password = (0, member_1.encryptPassword)(updateMemberDto.password);
            }
        }
        memberInfo.dataMigration(updateMemberDto);
        const updateResult = await this.memberRepository.updateMember(memberInfo);
        if (updateResult.affected !== 1) {
            throw message_1.Message.SERVER_ERROR;
        }
    }
    async imgUpdate(file, member) {
        const originalProfileImgKey = member.profile_img_key;
        const profileImgKey = config_1.filePath.profileImg + await (0, utils_1.createKey)(this.memberRepository, 'profile_img_key', 16) + '_' + Date.now() + '.' + file.fileType;
        member.dataMigration({ profile_img_key: profileImgKey });
        const updateResult = await this.memberRepository.updateMember(member);
        if (updateResult.affected !== 1) {
            throw message_1.Message.SERVER_ERROR;
        }
        (0, fs_1.writeFileSync)(config_1.basePath + profileImgKey, file.fileBuffer);
        if (originalProfileImgKey !== undefined && fs.existsSync(config_1.basePath + originalProfileImgKey)) {
            fs.unlinkSync(config_1.basePath + originalProfileImgKey);
        }
    }
    async imgDelete(member) {
        const originalProfileImgKey = member.profile_img_key;
        member.dataMigration({ profile_img_key: null });
        const updateResult = await this.memberRepository.updateMember(member);
        if (updateResult.affected !== 1) {
            throw message_1.Message.SERVER_ERROR;
        }
        if (originalProfileImgKey !== undefined && fs.existsSync(config_1.basePath + originalProfileImgKey)) {
            fs.unlinkSync(config_1.basePath + originalProfileImgKey);
        }
    }
};
MemberService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(member_repository_1.MemberRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(token_repository_1.TokenRepository)),
    __metadata("design:paramtypes", [member_repository_1.MemberRepository,
        token_repository_1.TokenRepository])
], MemberService);
exports.MemberService = MemberService;
//# sourceMappingURL=member.service.js.map