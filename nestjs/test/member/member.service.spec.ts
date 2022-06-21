import {Member} from "../../src/modules/member/entities/member.entity";
import {Test, TestingModule} from "@nestjs/testing";
import {getRepositoryToken, TypeOrmModule} from "@nestjs/typeorm";
import {staticPath, typeOrmOptions} from "../../config/config";
import {
    createMemberData, getProfileImageData,
    loginHeader,
    savedMemberData,
} from "./member";
import {MemberService} from "../../src/modules/member/member.service";
import {MemberRepository} from "../../src/modules/member/member.repository";
import {TokenRepository} from "../../src/modules/member/token/token.repository";
import {TodoGroupRepository} from "../../src/modules/todoGroup/todoGroup.repository";
import {LoginMemberDto} from "../../src/modules/member/dto/login-member.dto";
import {CreateMemberDto} from "../../src/modules/member/dto/create-member-dto";
import {createRandomString} from "../../libs/utils";
import {UpdateResult} from "typeorm";
import {UpdateMemberDto} from "../../src/modules/member/dto/update-member.dto";
import {FileType} from "../../src/common/type/type";
import Buffer from "buffer";
import {existsSync, readFileSync} from "fs";

describe('Member Service', () => {
    let memberService: MemberService;
    let loginMemberInfo: Member;
    let profileImgKey: string;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot(typeOrmOptions),
                TypeOrmModule.forFeature([
                    MemberRepository,
                    TokenRepository,
                    TodoGroupRepository
                ])
            ],
            providers: [
                MemberService,
                {
                    provide: getRepositoryToken(Member),
                    useValue: MemberService
                }
            ]
        }).compile()

        memberService = module.get<MemberService>(MemberService)
    });

    describe('login()', () => {
        it('로그인', async () => {
            const loginMemberDto: LoginMemberDto = {id: savedMemberData.id, password: savedMemberData.password, keep_check: false};

            loginMemberInfo = await memberService.login(loginMemberDto, loginHeader);

            expect(loginMemberInfo instanceof Member).toBe(true);
        });
    });

    describe('signUp()', () => {
        it('회원가입', async () => {
            const createMemberDto: CreateMemberDto = createMemberData();

            await memberService.signUp(createMemberDto);
        });
    });

    describe('duplicateCheck()', () => {
        it('중복 체크', async () => {
            const { id, nickname, email } = savedMemberData;

            const idCheckResult = await memberService.duplicateCheck('id', id);
            const nicknameCheckResult = await memberService.duplicateCheck('nickname', nickname);
            const emailCheckResult = await memberService.duplicateCheck('email', email);

            expect(!idCheckResult).toBe(true);
            expect(!nicknameCheckResult).toBe(true);
            expect(!emailCheckResult).toBe(true);

            const randomString = createRandomString(12);
            const idCheckResultTrue = await memberService.duplicateCheck('id', randomString);
            const nicknameCheckResultTrue = await memberService.duplicateCheck('nickname', randomString);
            const emailCheckResultTrue = await memberService.duplicateCheck('email', randomString);

            expect(!idCheckResultTrue).toBe(false);
            expect(!nicknameCheckResultTrue).toBe(false);
            expect(!emailCheckResultTrue).toBe(false);
        });
    });

    describe('updateMember()', () => {
        it('멤버 수정', async () => {
            const member: Member = new Member();
            member.dataMigration(savedMemberData);

            const updateMemberData: UpdateMemberDto = {
                nickname: savedMemberData.nickname,
                email: savedMemberData.email,
                password: savedMemberData.password,
                originalPassword: savedMemberData.password
            };

            await memberService.updateMember(updateMemberData, member);
        });
    });

    describe('imgUpdate()', () => {
        it('프로필 사진 수정', async () => {
            const imgData: FileType = getProfileImageData();

            profileImgKey = await memberService.imgUpdate(imgData, loginMemberInfo);

            const fileBuffer: Buffer = readFileSync(staticPath + profileImgKey);

            expect(fileBuffer.buffer instanceof ArrayBuffer).toBe(true);
        });
    });

    describe('deleteUpdate()', () => {
        it('프로필 사진 삭제', async () => {
            const profileImgPath = staticPath + profileImgKey;

            expect(existsSync(profileImgPath)).toBe(true);

            await memberService.imgDelete(loginMemberInfo);

            expect(existsSync(profileImgPath)).toBe(false);
        });
    });

});