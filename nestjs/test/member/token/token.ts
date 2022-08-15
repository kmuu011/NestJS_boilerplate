import {Token} from "../../../src/modules/member/entities/token.entity";

export const savedTokenInfo = {
    idx: 1,
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHgiOjExMiwiaWQiOiJ0dHMxIiwibmlja25hbWUiOiJ0dHMxIiwidGltZSI6MTY1NTczNjc0NTMxNywiaWF0IjoxNjU1NzM2NzQ1LCJleHAiOjQ4MDkzMzY3NDV9.psvrnoEhCGEoNFeRk_URCE8ukmBRerw585NLbQyMnZw',
    code: 'hm9bj5u1laa1a1s3g2uiunduhh5lufbo'
}

export const getMockToken = (where?) => {
    const token: Token = new Token();

    token.dataMigration(savedTokenInfo);

    if(where !== undefined){
        return undefined;
    }

    return token;
}

export const mockTokenRepository = {
    select: jest.fn().mockImplementation(() => Promise.resolve(getMockToken())),
    findOne: jest.fn().mockImplementation(
        (where) =>  Promise.resolve(getMockToken(where))),
    saveToken: jest.fn().mockImplementation(() => Promise.resolve(getMockToken()))
}