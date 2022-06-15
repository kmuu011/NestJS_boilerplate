import {MemberRepository} from "../../src/modules/member/member.repository";
import {Test, TestingModule} from "@nestjs/testing";
import {getRepositoryToken} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Member} from "../../src/modules/member/entities/member.entity";
import {createMemberDto, createMemberResult, loginMemberDto, loginMemberResult} from "./member";

describe('Member Repository', () => {
    let memberRepository: MemberRepository;
    let ormMock: Repository<Member>;

    beforeAll(async () => {
        const mockMemberRepository = {
            findOne: jest.fn(),
            save: jest.fn()
        }

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MemberRepository,
                {
                    provide: getRepositoryToken(Member),
                    useValue: mockMemberRepository
                }
            ]
        }).compile();

        memberRepository = module.get<MemberRepository>(MemberRepository);
        ormMock = module.get(getRepositoryToken(Member))
    });

    describe('signUp()', () => {
        it('should create a new member', async () => {
            const memberDto: Member = createMemberDto();
            const createMemberExceptedResult: Member = createMemberResult();

            jest.spyOn(memberRepository, 'save')
                .mockImplementation(() => Promise.resolve(createMemberExceptedResult));

            const createResult = await memberRepository.signUp(undefined, memberDto);

            expect(createResult.id).toBe(createMemberExceptedResult.id);
            expect(createResult.password).toBe(createMemberExceptedResult.password);
            expect(createResult.nickname).toBe(createMemberExceptedResult.nickname);
            expect(createResult.email).toBe(createMemberExceptedResult.email);
        });
    });

    describe('login()', () => {
        it('should return a member', async () => {
            const loginDto: Member = loginMemberDto(false);
            const loginExceptedResult: Member = loginMemberResult();

            jest.spyOn(memberRepository, 'findOne')
                .mockImplementation(() => new Promise(resolve => resolve(loginExceptedResult)));

            const loginResult = await memberRepository.select(loginDto, 'id, password');

            expect(loginResult.id).toBe(loginExceptedResult.id);
        });
    });

});