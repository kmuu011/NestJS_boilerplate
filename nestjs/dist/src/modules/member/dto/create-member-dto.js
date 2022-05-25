"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMemberDto = void 0;
const member_entity_1 = require("../entities/member.entity");
const mapped_types_1 = require("@nestjs/mapped-types");
class CreateMemberDto extends (0, mapped_types_1.PickType)(member_entity_1.Member, ['id', 'nickname', 'email', 'password']) {
}
exports.CreateMemberDto = CreateMemberDto;
//# sourceMappingURL=create-member-dto.js.map