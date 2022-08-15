import {Member} from "../../src/modules/member/entities/member.entity";
import {Test, TestingModule} from "@nestjs/testing";
import {
    getCreateMemberData,
    getMockMember,
    loginHeader, mockMemberRepository,
    savedMemberData,
} from "./member";
import {MemberService} from "../../src/modules/member/member.service";
import {MemberRepository} from "../../src/modules/member/member.repository";
import {TokenRepository} from "../../src/modules/member/token/token.repository";
import {TodoGroupRepository} from "../../src/modules/todoGroup/todoGroup.repository";
import {LoginMemberDto} from "../../src/modules/member/dto/login-member.dto";
import {Connection, QueryRunner, Repository} from "typeorm";
import {getRepositoryToken, TypeOrmModule} from "@nestjs/typeorm";
import {getMockToken, mockTokenRepository} from "./token/token";
import spyOn = jest.spyOn;

import {CreateMemberDto} from "../../src/modules/member/dto/create-member-dto";
import {mockConnection} from "../common/const";
import {typeOrmOptions} from "../../config/config";

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
                    useValue: {}
                },
                // {
                //     provide: Connection,
                //     useValue: mockConnection
                // },

                MemberService,

            ]
        })
            // .overrideProvider(Connection)
            // .useValue(mockConnection)
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

    // describe('duplicateCheck()', () => {
    //     it('중복 체크', async () => {
    //         const checkKeyList = ['id', 'nickname', 'email'];
    //
    //         const randomString = createRandomString(12);
    //
    //         for(const key of checkKeyList){
    //             const dupCheckFalse = await memberService.duplicateCheck(key, savedMemberData[key]);
    //             expect(!dupCheckFalse).toBeTruthy();
    //
    //             const dupCheckTrue = await memberService.duplicateCheck(key, randomString);
    //             expect(!dupCheckTrue).toBeFalsy()
    //         }
    //     });
    // });
    //
    // describe('updateMember()', () => {
    //     it('멤버 수정', async () => {
    //         const member: Member = new Member();
    //         member.dataMigration(savedMemberData);
    //
    //         const updateMemberData: UpdateMemberDto = getUpdateMemberData();
    //
    //         await memberService.updateMember(updateMemberData, member);
    //     });
    // });
    //
    // describe('signOut()', () => {
    //     it('회원 탈퇴', async () => {
    //         const deleteResult: DeleteResult = await memberService.signOut(createdMemberInfo);
    //
    //         expect(deleteResult.affected).toBe(1);
    //     });
    // });
    //
    // describe('updateImg()', () => {
    //     it('프로필 사진 수정', async () => {
    //         const imgData: FileType = getProfileImageData();
    //
    //         profileImgKey = await memberService.updateImg(imgData, loginMemberInfo);
    //
    //         const fileBuffer: Buffer = readFileSync(staticPath + profileImgKey);
    //
    //         expect(fileBuffer.buffer instanceof ArrayBuffer).toBeTruthy();
    //     });
    // });
    //
    // describe('deleteUpdate()', () => {
    //     it('프로필 사진 삭제', async () => {
    //         const profileImgPath = staticPath + profileImgKey;
    //
    //         expect(existsSync(profileImgPath)).toBeTruthy();
    //
    //         await memberService.deleteImg(loginMemberInfo);
    //
    //         expect(existsSync(profileImgPath)).toBeFalsy();
    //     });
    // });

});