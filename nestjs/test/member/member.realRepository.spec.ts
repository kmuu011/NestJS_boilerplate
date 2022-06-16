import {MemberRepository} from "../../src/modules/member/member.repository";
import {Member} from "../../src/modules/member/entities/member.entity";
import {Test, TestingModule} from "@nestjs/testing";
import {getRepositoryToken, TypeOrmModule} from "@nestjs/typeorm";
import {DeleteResult, UpdateResult} from "typeorm";
import {typeOrmOptions} from "../../config/config";
import {
    createMemberDto,
    savedMemberInfo,
} from "./member";
import {createRandomString} from "../../libs/utils";

describe('Member Real Repository', () => {
    let memberRepository: MemberRepository;
    let loginMemberInfo: Member;
    let signUpMemberInfo: Member;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot(typeOrmOptions),
                TypeOrmModule.forFeature([
                        MemberRepository,
                ])
            ],
            providers: [
                MemberRepository,
                {
                    provide: getRepositoryToken(Member),
                    useValue: MemberRepository
                }
            ]
        }).compile()

        memberRepository = module.get<MemberRepository>(MemberRepository)
    });

    describe('signUp()', () => {
        it('회원가입 기능', async () => {
            const memberDto: Member = createMemberDto();

            const signUpResult: Member = await memberRepository.signUp(undefined, memberDto);

            expect(true).toBe(true);

            signUpMemberInfo = signUpResult;

            // 로그인용 계정 체크 및 생성 하는부분
            const loginMember: Member = new Member();
            loginMember.dataMigration(savedMemberInfo);
            loginMember.passwordEncrypt();

            const selectResult: Member = await memberRepository.select(loginMember, 'id, password', true);

            if(!selectResult) {
                const loginMemberSignUpResult: Member = await memberRepository.signUp(undefined, loginMember);
                expect(loginMemberSignUpResult instanceof Member).toBe(true);
                loginMemberInfo = loginMemberSignUpResult;
            } else {
                loginMemberInfo = selectResult;
            }
        });
    })

    describe('login()', () => {
        it('로그인 기능', async () => {
            const loginResult: Member = await memberRepository.select(loginMemberInfo, 'id, password');

            expect(loginResult instanceof Member).toBe(true);
        });
    })

    describe('updateMember()', () => {
        it('멤버 수정', async () => {
            loginMemberInfo.nickname = createRandomString(12);

            const updateResult: UpdateResult = await memberRepository.updateMember(loginMemberInfo);

            expect(updateResult instanceof UpdateResult).toBe(true);
            expect(updateResult.affected).toBe(1);
        });
    })

    describe('signOut()', () => {
        it('회원 탈퇴', async () => {
            const deleteResult: DeleteResult = await memberRepository.signOut(signUpMemberInfo);

            expect(deleteResult.affected).toBe(1);
        });
    });

});