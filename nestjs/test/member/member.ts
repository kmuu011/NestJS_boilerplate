import {Member} from "../../src/modules/member/entities/member.entity";
import {createRandomString} from "../../libs/utils";
import {FileType} from "../../src/common/type/type";
import {readFileSync} from "fs";
import {basePath} from "../../config/config";
import Buffer from "buffer";

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

export const createMemberData = (): Member => {
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

export const getProfileImageData = () => {
    const fileBuffer: Buffer = readFileSync(basePath + '/test/static/img/cute.jpg');
    return {
        fileBuffer,
        fileType: 'jpg',
        fileName: 'cute',
        fileSize: fileBuffer.length
    }
}