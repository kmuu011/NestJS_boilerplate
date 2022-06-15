import {MemberRepository} from "../../src/modules/member/member.repository";
import {Member} from "../../src/modules/member/entities/member.entity";
import {Test, TestingModule} from "@nestjs/testing";
import {getRepositoryToken, TypeOrmModule} from "@nestjs/typeorm";
import {DeleteResult} from "typeorm";
import {typeOrmOptions} from "../../config/config";
import {createMemberDto, getCreatedMemberInfo, getLoginMember, saveCreatedMemberInfo, saveLoginMember} from "./member";

describe('Member Real Repository', () => {
    let memberRepository: MemberRepository;

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
        it('회원가입 돼야함', async () => {
            const memberDto: Member = createMemberDto();

            const signUpResult: Member = await memberRepository.signUp(undefined, memberDto);

            expect(true).toBe(true);

            saveCreatedMemberInfo(signUpResult);

            // 로그인용 계정 체크 및 생성 하는부분
            const loginMember: Member = new Member();
            loginMember.dataMigration({id: 'tts1', password: 'tts1', nickname: 'tts1', email: 'tts1@email.com'});
            loginMember.passwordEncrypt();

            const memberInfo: Member = await memberRepository.select(loginMember, 'id, password', true);

            if(!memberInfo) {
                const loginMemberSignUpResult: Member = await memberRepository.signUp(undefined, loginMember);
                expect(loginMemberSignUpResult instanceof Member).toBe(true);
                saveLoginMember(loginMemberSignUpResult);
            } else {
                saveLoginMember(memberInfo);
            }
        });
    })

    describe('login()', () => {
        it('로그인이 돼야함', async () => {
            const member: Member = getLoginMember();

            const loginResult = await memberRepository.select(member, 'id, password');

            expect(loginResult instanceof Member).toBe(true);
        });
    })

    describe('signOut()', () => {
        it('회원 탈퇴', async () => {
            const member: Member = getCreatedMemberInfo();

            const deleteResult: DeleteResult = await memberRepository.signOut(member);

            expect(deleteResult.affected).toBe(1);
        });
    });

});