import {Member} from "../../src/modules/member/entities/member.entity";
import {createRandomString} from "../../libs/utils";

export const savedMemberInfo = {
    idx: 112,
    id: 'tts1',
    password: 'tts1',
    nickname: 'tts1',
    email: 'tts1@email.com'
};

export const createMemberDto = (): Member => {
    const key = createRandomString(12);

    const member = new Member();

    member.dataMigration({
        idx: 120,
        id: key,
        password: key,
        nickname: key,
        email: key + "@naver.com"
    });

    member.passwordEncrypt();

    return member;
};
