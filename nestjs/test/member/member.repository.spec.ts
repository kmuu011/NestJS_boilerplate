import {MemberRepository} from "../../src/modules/member/member.repository";
import {Member} from "../../src/modules/member/entities/member.entity";
import {Test, TestingModule} from "@nestjs/testing";
import {DeleteResult, UpdateResult} from "typeorm";
import {
    getMockMember, savedMemberData,
} from "./member";

import spyOn = jest.spyOn;
import {getDeleteResult, getUpdateResult} from "../common/const";

describe('Member Repository', () => {
    let memberRepository: MemberRepository;
    const mockMember: Member = getMockMember();

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MemberRepository,
            ]
        }).compile()

        memberRepository = module.get<MemberRepository>(MemberRepository)
    });

    describe('signUp()', () => {
        it('회원가입 기능', async () => {
            spyOn(memberRepository, 'save')
                .mockImplementation(() => Promise.resolve(mockMember));

            const signUpResult: Member = await memberRepository.signUp(undefined, mockMember);

            expect(signUpResult instanceof Member).toBeTruthy();
        });
    })

    describe('login()', () => {
        it('로그인 기능', async () => {
            spyOn(memberRepository, 'findOne')
                .mockImplementation(() => Promise.resolve(mockMember))

            const loginResult: Member = await memberRepository.select(mockMember, 'id, password');

            expect(loginResult instanceof Member).toBeTruthy();
        });
    })

    describe('updateMember()', () => {
        it('멤버 수정', async () => {
            spyOn(memberRepository, 'update')
                .mockImplementation(() => Promise.resolve(getUpdateResult()))

            const updateResult: UpdateResult = await memberRepository.updateMember(mockMember);

            expect(updateResult.affected).toBe(1);
        });
    })

    describe('duplicateCheck()', () => {
        it('중복 체크', async () => {
            const checkKeyList = ['id', 'nickname', 'email'];

            for(const key of checkKeyList){
                const isDuplicate = await memberRepository.duplicateCheck(key, savedMemberData[key]);
                expect(!isDuplicate).toBeFalsy();
            }
        });
    })

    describe('signOut()', () => {
        it('회원 탈퇴', async () => {
            spyOn(memberRepository, 'delete')
                .mockImplementation(() => Promise.resolve(getDeleteResult()));

            const deleteResult: DeleteResult = await memberRepository.signOut(mockMember);

            expect(deleteResult.affected).toBe(1);
        });
    });

});