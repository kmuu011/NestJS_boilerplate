"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTodoDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const todo_entity_1 = require("../entities/todo.entity");
class CreateTodoDto extends (0, mapped_types_1.PickType)(todo_entity_1.Todo, ['content']) {
}
exports.CreateTodoDto = CreateTodoDto;
//# sourceMappingURL=create-todo-dto.js.map