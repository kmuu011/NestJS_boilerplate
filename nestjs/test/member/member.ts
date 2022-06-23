import {Member} from "../../src/modules/member/entities/member.entity";
import {createRandomString} from "../../libs/utils";
import {readFileSync} from "fs";
import {basePath} from "../../config/config";
import Buffer from "buffer";
import {UpdateMemberDto} from "../../src/modules/member/dto/update-member.dto";

export const savedMemberData = {
    idx: 112,
    id: 'tts1',
    password: 'tts1',
    nickname: 'tts1',
    email: 'tts1@email.com'
};

export const loginHeader = {
    ip: "127.0.0.1",
    "user-agent": "test-agent"
};

export const getCreateMemberData = (encryptPassword): Member => {
    const key = createRandomString(12);

    const member = new Member();

    member.dataMigration({
        idx: 120,
        id: key,
        password: key,
        nickname: key,
        email: key + "@naver.com"
    });

    if(encryptPassword) {
        member.passwordEncrypt();
    }

    return member;
};

export const getUpdateMemberData = (): UpdateMemberDto => {
    const member: Member = new Member();
    member.dataMigration(savedMemberData);

    return {
        nickname: savedMemberData.nickname,
        email: savedMemberData.email,
        password: savedMemberData.password,
        originalPassword: savedMemberData.password
    };
}

export const getProfileImageData = () => {
    const fileBuffer: Buffer = readFileSync(basePath + '/test/static/img/cute.jpg');
    return {
        fileBuffer,
        fileType: 'jpg',
        fileName: 'cute',
        fileSize: fileBuffer.length
    }
}