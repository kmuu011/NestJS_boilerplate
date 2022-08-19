import {Test, TestingModule} from "@nestjs/testing";
import {TodoGroupRepository} from "../../../src/modules/todoGroup/todoGroup.repository";
import {Member} from "../../../src/modules/member/entities/member.entity";
import {getSavedMember} from "../member";
import {TodoGroup} from "../../../src/modules/todoGroup/entities/todoGroup.entity";

describe('TodoGroup Repository', () => {
    let todoGroupRepository: TodoGroupRepository;
    const savedMemberInfo: Member = getSavedMember();

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TodoGroupRepository,
            ]
        }).compile()

        todoGroupRepository = module.get<TodoGroupRepository>(TodoGroupRepository)
    });

    describe('selectOne()', () => {
        it('할일 그룹 상세 조회', async () => {
            const todoGroup = new TodoGroup();

            // await todoGroupRepository.selectOne()

            expect(true).toBeTruthy();
        });
    })


});