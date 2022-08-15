import {Member} from "../../src/modules/member/entities/member.entity";
import {Test, TestingModule} from "@nestjs/testing";
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeOrmOptions} from "../../config/config";
import {
    getCreateMemberData, getProfileImageData, getUpdateMemberData,
    loginHeader, mockMemberService,
    savedMemberData,
} from "./member";
import {MemberRepository} from "../../src/modules/member/member.repository";
import {TokenRepository} from "../../src/modules/member/token/token.repository";
import {TodoGroupRepository} from "../../src/modules/todoGroup/todoGroup.repository";
import {LoginMemberDto} from "../../src/modules/member/dto/login-member.dto";
import {MemberController} from "../../src/modules/member/member.controller";
import {MemberService} from "../../src/modules/member/member.service";

import {createRequest} from "node-mocks-http";
import {Request} from "express";
import {FileType, LoginResponseType, ResponseBooleanType} from "../../src/common/type/type";
import {CreateMemberDto} from "../../src/modules/member/dto/create-member-dto";
import {UpdateMemberDto} from "../../src/modules/member/dto/update-member.dto";
import {createRandomString} from "../../libs/utils";
import {DuplicateCheckMemberDto} from "../../src/modules/member/dto/duplicate-check-member.dto";

describe('Member Controller', () => {
    let memberController: MemberController;
    let memberService: MemberService;

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
            controllers: [MemberController],
            providers: [
                {
                    provide: MemberService,
                    useValue: mockMemberService
                }
            ]
        }).compile();

        memberController = module.get<MemberController>(MemberController);
        memberService = module.get<MemberService>(MemberService);
    });

    describe('login()', () => {
        it('로그인', async () => {
            const req: Request = createRequest();
            req.headers = loginHeader;

            const loginMemberDto: LoginMemberDto = {
                id: savedMemberData.id,
                password: savedMemberData.password,
                keep_check: false
            };

            const loginResponseType: LoginResponseType = await memberController.login(req, loginMemberDto);

            expect(loginResponseType.tokenCode !== undefined).toBeTruthy();
        });
    });

    describe('signUp()', () => {
        it('회원가입', async () => {
            const createMemberDto: CreateMemberDto = getCreateMemberData(false);

            const signUpResponse: ResponseBooleanType = await memberController.signUp(createMemberDto);

            expect(signUpResponse.result).toBeTruthy();
        });
    });

    describe('updateMember()', () => {
        it('멤버 수정', async () => {
            const req: Request = createRequest();
            const member: Member = new Member();
            member.dataMigration(savedMemberData);
            member.password = undefined;

            req.locals = {
                memberInfo: member
            };

            const updateMemberDto: UpdateMemberDto = getUpdateMemberData();

            const updateResponse: ResponseBooleanType = await memberController.updateMember(req, updateMemberDto);

            expect(updateResponse.result).toBeTruthy();
        });
    });

    describe('duplicateCheck()', () => {
        it('중복 체크', async () => {
            const checkKeyList = ['id', 'nickname', 'email'];

            const randomString = createRandomString(12);

            for(let i=0 ; i<checkKeyList.length ; i++){
                let duplicateCheckDto: DuplicateCheckMemberDto = {type: i, value: savedMemberData[checkKeyList[i]]}

                const responseUnUsable: ResponseBooleanType = await memberController.duplicateCheck(duplicateCheckDto);

                expect(responseUnUsable.usable).toBeFalsy();

                duplicateCheckDto = {type: i, value: randomString};

                const responseUsable: ResponseBooleanType = await memberController.duplicateCheck(duplicateCheckDto);

                expect(responseUsable.usable).toBeTruthy();
            }
        });
    });

    describe('signOut()', () => {
        it('회원 탈퇴', async () => {
            const createMemberDto: Member = getCreateMemberData(false);

            const req: Request = createRequest();
            const member: Member = new Member();
            member.idx = createMemberDto.idx;

            req.locals = {
                memberInfo: member
            };

            const signOutResponse: ResponseBooleanType = await memberController.signOut(req);

            expect(signOutResponse.result).toBeTruthy();
        });
    });

    describe('updateImg()', () => {
        it('프로필 사진 수정', async () => {
            const imgData: FileType = getProfileImageData();
            const req: Request = createRequest();
            const member: Member = new Member();
            member.dataMigration(savedMemberData);
            member.password = undefined;

            req.locals = {
                memberInfo: member
            };

            const file = {
                fieldname: 'file',
                originalname: imgData.fileName + '.' + imgData.fileType,
                encoding: '7bit',
                mimetype: 'image/jpeg',
                buffer: imgData.fileBuffer,
                size: imgData.fileSize
            }

            const updateImgResponse: ResponseBooleanType = await memberController.updateImg(req, file);

            expect(updateImgResponse.result).toBeTruthy();
        });
    });

    describe('deleteImg()', () => {
        it('프로필 사진 삭제', async () => {
            const req: Request = createRequest();
            const member: Member = new Member();
            member.dataMigration(savedMemberData);

            req.locals = {
                memberInfo: member
            };

            const deleteImgResponse: ResponseBooleanType = await memberController.deleteImg(req);

            expect(deleteImgResponse.result).toBeTruthy();
        });
    });


});