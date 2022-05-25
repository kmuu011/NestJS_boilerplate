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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const member_entity_1 = require("../../modules/member/entities/member.entity");
const typeorm_1 = require("@nestjs/typeorm");
const token_repository_1 = require("../../modules/member/token/token.repository");
const utils = require("../../../libs/utils");
const config_1 = require("../../../config/config");
let AuthGuard = class AuthGuard {
    constructor(tokenRepository) {
        this.tokenRepository = tokenRepository;
    }
    async canActivate(context) {
        const now = Date.now();
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();
        const { ip, "user-agent": userAgent, "token-code": tokenCode } = req.headers;
        const member = new member_entity_1.Member();
        const memberInfo = await this.tokenRepository.createQueryBuilder('t')
            .select([
            'm.idx', 'm.id', 'm.nickname', 'm.email', 'm.profile_img_key', 'm.created_at',
            'm.ip', 'm.user_agent', 'm.auth_type', 'm.auth_id',
            't.idx', 't.code', 't.token'
        ])
            .leftJoin('t.member', 'm')
            .where('t.memberIdx = m.idx ' +
            'AND t.code = :code', { code: tokenCode })
            .getOne();
        member.dataMigration(memberInfo.member);
        member.tokenInfo = memberInfo;
        delete memberInfo.member;
        const jwtPayload = await member.decodeToken();
        if (jwtPayload.keep_check === true && ((now - jwtPayload.time) / 1000) > config_1.auth.tokenRefreshTime) {
            member.dataMigration({
                keep_check: jwtPayload.keep_check
            });
            const newToken = member.createToken();
            const code = await utils.createKey(this.tokenRepository, 'code', 40);
            member.tokenInfo = await this.tokenRepository.saveToken(member, newToken, code);
            res.header('new-token-code', code);
        }
        req.locals.memberInfo = member;
        return true;
    }
};
AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(token_repository_1.TokenRepository)),
    __metadata("design:paramtypes", [token_repository_1.TokenRepository])
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map