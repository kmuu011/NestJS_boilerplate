import {Member} from "../../src/modules/member/entities/member.entity";
import {Test, TestingModule} from "@nestjs/testing";
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeOrmOptions} from "../../config/config";
import {
    getCreateMemberData, getUpdateMemberData,
    loginHeader,
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
import {LoginResponseType, ResponseBooleanType} from "../../src/common/type/type";
import {CreateMemberDto} from "../../src/modules/member/dto/create-member-dto";
import {UpdateMemberDto} from "../../src/modules/member/dto/update-member.dto";

describe('Member Controller', () => {
    let memberController: MemberController;

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
                MemberService
            ]
        }).compile();

        memberController = module.get<MemberController>(MemberController);
    });

    describe('login()', () => {
        it('로그인', async () => {
            const req: Request = createRequest();
            req.headers = loginHeader;

            const loginMemberDto: LoginMemberDto = {id: savedMemberData.id, password: savedMemberData.password, keep_check: false};

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

            req.locals = {
                memberInfo: member
            };

            const updateMemberDto: UpdateMemberDto = getUpdateMemberData();

            const updateResponse: ResponseBooleanType = await memberController.updateMember(req, updateMemberDto);

            expect(updateResponse.result).toBeTruthy();
        });
    });


});