import { TodoGroupRepository } from "./todoGroup.repository";
import { TodoGroup } from "./entities/todoGroup.entity";
import { Member } from "../member/entities/member.entity";
import { CreateTodoGroupDto } from "./dto/create-todoGroup-dto";
import { UpdateTodoGroupDto } from "./dto/update-todoGroup-dto";
import { SelectListResponseType } from "../../common/type/type";
export declare class TodoGroupService {
    private readonly todoGroupRepository;
    constructor(todoGroupRepository: TodoGroupRepository);
    arrangeOrder(member: Member, todoGroup?: TodoGroup, order?: number): Promise<void>;
    selectOne(member: Member, todoGroupIdx: number): Promise<TodoGroup>;
    selectList(member: Member, page: number, count: number): Promise<SelectListResponseType<TodoGroup>>;
    create(member: Member, body: CreateTodoGroupDto): Promise<TodoGroup>;
    update(member: Member, todoGroup: TodoGroup, body: UpdateTodoGroupDto): Promise<void>;
    delete(member: Member, todoGroup: TodoGroup): Promise<void>;
}
