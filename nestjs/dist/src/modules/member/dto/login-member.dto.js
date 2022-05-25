"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginMemberDto = void 0;
const member_entity_1 = require("../entities/member.entity");
const mapped_types_1 = require("@nestjs/mapped-types");
class LoginMemberDto extends (0, mapped_types_1.PickType)(member_entity_1.Member, ['id', 'password', 'keep_check']) {
}
exports.LoginMemberDto = LoginMemberDto;
//# sourceMappingURL=login-member.dto.js.map