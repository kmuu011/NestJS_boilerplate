import {MemberRepository} from "../../src/modules/member/member.repository";
import {Member} from "../../src/modules/member/entities/member.entity";
import {Test, TestingModule} from "@nestjs/testing";
import {getRepositoryToken, TypeOrmModule} from "@nestjs/typeorm";
import {DeleteResult, UpdateResult} from "typeorm";
import {typeOrmOptions} from "../../config/config";
import {
    getCreateMemberData,
    savedMemberData,
} from "./member";
import {createRandomString} from "../../libs/utils";

describe('Member Repository', () => {
    let memberRepository: MemberRepository;
    let savedMemberInfo: Member;
    let createdMemberInfo: Member;

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
            const memberDto: Member = getCreateMemberData(true);

            const signUpResult: Member = await memberRepository.signUp(undefined, memberDto);

            expect(signUpResult instanceof Member).toBeTruthy();

            createdMemberInfo = signUpResult;

            // 로그인용 계정 체크 및 생성 하는부분
            const loginMember: Member = new Member();
            loginMember.dataMigration(savedMemberData);
            loginMember.passwordEncrypt();

            const selectResult: Member = await memberRepository.select(loginMember, 'id, password', true);

            if(!selectResult) {
                const loginMemberSignUpResult: Member = await memberRepository.signUp(undefined, loginMember);
                expect(loginMemberSignUpResult instanceof Member).toBeTruthy();
                savedMemberInfo = loginMemberSignUpResult;
            } else {
                savedMemberInfo = selectResult;
            }
        });
    })

    describe('login()', () => {
        it('로그인 기능', async () => {
            const loginResult: Member = await memberRepository.select(savedMemberInfo, 'id, password');

            expect(loginResult instanceof Member).toBeTruthy();
        });
    })

    describe('updateMember()', () => {
        it('멤버 수정', async () => {
            const updateResult: UpdateResult = await memberRepository.updateMember(savedMemberInfo);

            // expect(updateResult instanceof UpdateResult).toBeTruthy();
            // expect(updateResult.affected).toBe(1);
        });
    })


    describe('duplicateCheck()', () => {
        it('중복 체크', async () => {
            const checkKeyList = ['id', 'nickname', 'email'];

            const randomString = createRandomString(12);

            for(const key of checkKeyList){
                const dupCheckTrue = await memberRepository.duplicateCheck(key, savedMemberData[key]);
                expect(!dupCheckTrue).toBeFalsy();

                const dupCheckFalse = await memberRepository.duplicateCheck(key, randomString);
                expect(!dupCheckFalse).toBeTruthy();
            }
        });
    })

    describe('signOut()', () => {
        it('회원 탈퇴', async () => {
            const deleteResult: DeleteResult = await memberRepository.signOut(createdMemberInfo);

            expect(deleteResult.affected).toBe(1);
        });
    });

});