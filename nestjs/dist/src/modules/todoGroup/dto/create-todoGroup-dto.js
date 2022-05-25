"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTodoGroupDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const todoGroup_entity_1 = require("../entities/todoGroup.entity");
class CreateTodoGroupDto extends (0, mapped_types_1.PickType)(todoGroup_entity_1.TodoGroup, ['title']) {
}
exports.CreateTodoGroupDto = CreateTodoGroupDto;
//# sourceMappingURL=create-todoGroup-dto.js.map