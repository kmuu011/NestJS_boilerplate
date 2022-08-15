import {TokenRepository} from "../../../src/modules/member/token/token.repository";
import {Member} from "../../../src/modules/member/entities/member.entity";
import {Test, TestingModule} from "@nestjs/testing";
import {Token} from "../../../src/modules/member/entities/token.entity";
import {getMockMember} from "../member";
import {getMockToken, savedTokenInfo} from "./token";
import spyOn = jest.spyOn;

describe('Token Repository', () => {
    let tokenRepository: TokenRepository;
    let loginMemberInfo: Member;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TokenRepository
            ]
        }).compile();

        tokenRepository = module.get<TokenRepository>(TokenRepository);
        loginMemberInfo = getMockMember();
    });
    
    describe('select()', () => {
        it('토근 조회 기능', async () => {
            spyOn(tokenRepository, 'findOne')
                .mockImplementation(() => Promise.resolve(getMockToken()));

            const token: Token = await tokenRepository.select(undefined, loginMemberInfo);

            expect(token instanceof Token).toBe(true);
        });
    });

    describe('saveToken()', () => {
        it('토큰 저장 기능', async () => {
            spyOn(tokenRepository, 'save')
                .mockImplementation(() => Promise.resolve(getMockToken()))

            const token: Token = new Token();

            token.dataMigration({ ...savedTokenInfo, member: loginMemberInfo });

            const result: Token = await tokenRepository.saveToken(token);

            expect(result instanceof Token).toBe(true);
        });
    });

});