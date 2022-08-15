import {Member} from "../../src/modules/member/entities/member.entity";
import {Test, TestingModule} from "@nestjs/testing";
import {
    getCreateMemberData,
    getProfileImageData, getUpdateMemberData,
    loginHeader, mockMemberRepository,
    savedMemberData,
} from "./member";
import {MemberService} from "../../src/modules/member/member.service";
import {MemberRepository} from "../../src/modules/member/member.repository";
import {TokenRepository} from "../../src/modules/member/token/token.repository";
import {TodoGroupRepository} from "../../src/modules/todoGroup/todoGroup.repository";
import {LoginMemberDto} from "../../src/modules/member/dto/login-member.dto";
import {Connection, DeleteResult, UpdateResult} from "typeorm";
import {TypeOrmModule} from "@nestjs/typeorm";
import {mockTokenRepository} from "./token/token";

import {CreateMemberDto} from "../../src/modules/member/dto/create-member-dto";
import {mockConnection} from "../common/const";
import {staticPath, typeOrmOptions} from "../../config/config";
import {mockTodoGroupRepository} from "./todoGroup/todoGroup";
import {UpdateMemberDto} from "../../src/modules/member/dto/update-member.dto";
import {FileType} from "../../src/common/type/type";
import {existsSync, readFileSync} from "fs";

describe('Member Service', () => {
    let memberService: MemberService;
    let loginMemberInfo: Member;
    let createdMemberInfo: Member;
    let profileImgKey: string;


    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports:[
                TypeOrmModule.forRoot(typeOrmOptions),
                TypeOrmModule.forFeature([
                    MemberRepository,
                    TokenRepository,
                    TodoGroupRepository
                ]),
            ],

            providers: [
                {
                    provide: MemberRepository,
                    useValue: mockMemberRepository
                },
                {
                    provide: TokenRepository,
                    useValue: mockTokenRepository
                },
                {
                    provide: TodoGroupRepository,
                    useValue: mockTodoGroupRepository
                },
                {
                    provide: Connection,
                    useValue: mockConnection
                },

                MemberService,

            ]
        })
            .overrideProvider(Connection)
            .useValue(mockConnection)
            .compile()

        memberService = module.get<MemberService>(MemberService);
    });

    describe('login()', () => {
        it('로그인', async () => {
            const loginMemberDto: LoginMemberDto = {id: savedMemberData.id, password: savedMemberData.password, keep_check: false};

            loginMemberInfo = await memberService.login(loginMemberDto, loginHeader);

            expect(loginMemberInfo instanceof Member).toBeTruthy();
        });
    });

    describe('signUp()', () => {
        it('회원가입', async () => {
            const createMemberDto: CreateMemberDto = getCreateMemberData(true);

            createdMemberInfo = await memberService.signUp(createMemberDto);

            expect(createdMemberInfo instanceof Member).toBeTruthy();
        });
    });

    describe('duplicateCheck()', () => {
        it('중복 체크', async () => {
            const checkKeyList = ['id', 'nickname', 'email'];

            for(const key of checkKeyList){
                const isDuplicate = await memberService.duplicateCheck(key, savedMemberData[key]);
                expect(isDuplicate).toBeFalsy();

                const isNotDuplicate = await memberService.duplicateCheck(key, key);
                expect(isNotDuplicate).toBeTruthy();
            }
        });
    });

    describe('updateMember()', () => {
        it('멤버 수정', async () => {
            const member: Member = new Member();
            member.dataMigration(savedMemberData);

            const updateMemberData: UpdateMemberDto = getUpdateMemberData();

            const updateResult: UpdateResult = await memberService.updateMember(updateMemberData, member);

            expect(updateResult.affected).toBe(1);
        });
    });

    describe('signOut()', () => {
        it('회원 탈퇴', async () => {
            const member: Member = await getCreateMemberData(true);
            const deleteResult: DeleteResult = await memberService.signOut(member);

            expect(deleteResult.affected).toBe(1);
        });
    });

    describe('updateImg()', () => {
        it('프로필 사진 수정', async () => {
            const imgData: FileType = getProfileImageData();
            const member: Member = await getCreateMemberData(true);

            profileImgKey = await memberService.updateImg(imgData, member);

            const fileBuffer: Buffer = readFileSync(staticPath + profileImgKey);

            expect(fileBuffer.buffer instanceof ArrayBuffer).toBeTruthy();
            expect(true).toBeTruthy();
        });
    });

    describe('deleteUpdate()', () => {
        it('프로필 사진 삭제', async () => {
            const profileImgPath = staticPath + profileImgKey;

            expect(existsSync(profileImgPath)).toBeTruthy();

            loginMemberInfo.dataMigration({profile_img_key: profileImgKey})

            await memberService.deleteImg(loginMemberInfo);

            expect(existsSync(profileImgPath)).toBeFalsy();
        });
    });

});