import {Member} from "../../src/modules/member/entities/member.entity";
import {LoginMemberDto} from "../../src/modules/member/dto/login-member.dto";
import {createRandomString} from "../../libs/utils";

export const savedMemberInfo = {
    id: 'tts1', password: 'tts1', nickname: 'tts1', email: 'tts1@email.com'
};

export const loginMemberDto = (keepCheck): Member => {
    const member = new Member();
    const loginMemberDto: LoginMemberDto = {
        id: "tts2",
        password: "tts2",
        keep_check: keepCheck
    };

    member.dataMigration(loginMemberDto);
    member.passwordEncrypt();

    return member;
}

export const loginMemberResult = (): Member => {
    const member = new Member();

    member.dataMigration({
        idx: 10,
        id: 'tts2',
        password: undefined,
        password_encrypted: undefined,
        nickname: 'tts2',
        email: 'tts2@ea.scom',
        profile_img_key: null,
        admin: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        auth_type: 0,
        auth_id: undefined,
        ip: null,
        user_agent: null,
        keep_check: undefined,
        tokenInfo: null
    });

    return member;
}

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

export const createMemberResult = (): Member => {
    const member = new Member();
    member.dataMigration({
        idx: 120,
        id: 'tts2',
        password: '26c648ea97630ca3924d985efbb3f76f8f9f657dce9e5a76d4869e26f076a0a49e0fd2956629559589d65ed8b6dcc8ad91bb12dbbd66d07927db0305fe293cc5',
        password_encrypted: true,
        nickname: 'tts2',
        email: 'tts2@ea.scom',
        profile_img_key: null,
        admin: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        auth_type: 0,
        auth_id: null,
        ip: null,
        user_agent: null,
        keep_check: undefined
    });

    return member;
}
