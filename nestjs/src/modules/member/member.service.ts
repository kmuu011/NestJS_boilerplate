import {Injectable} from '@nestjs/common';
import {MemberRepository} from "./member.repository";
import {Member} from "./entities/member.entity";
import {CreateMemberDto} from "./dto/create-member-dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Message} from "libs/message";
import {DuplicateCheckMemberDto} from "./dto/duplicate-check-member.dto";
import {LoginMemberDto} from "./dto/login-member.dto";
import {TokenRepository} from "./token.repository";
import {createKey} from "libs/utils";

import {writeFileSync} from "fs";
import {FileType} from "../../type/type";

const duplicateCheckKeys = ['id', 'nickname', 'email'];

@Injectable()
export class MemberService {
    constructor(
        @InjectRepository(MemberRepository) private memberRepository: MemberRepository,
        @InjectRepository(TokenRepository) private tokenRepository: TokenRepository,
    ) {}

    async auth(headers) {
        const member: Member = new Member();
        member.dataMigration({
            user_agent: headers["user_agent"],
            ip: headers["ip"]
        })

        await member.decodeToken();
    }

    async select(member) {
        return this.memberRepository.select(member);
    }

    async login(loginMemberDto: LoginMemberDto, headers): Promise<Member> {
        const member = new Member();
        const {ip, "user-agent": user_agent, "token-code": token} = headers
        member.dataMigration(loginMemberDto);

        member.passwordEncrypt();

        const loginResult: Member = await this.memberRepository.login(member);

        if (!loginResult) {
            throw Message.WRONG_ID_OR_PASSWORD;
        }

        member.dataMigration({
            ...loginResult,
            ...{ip, user_agent}
        });

        const newToken: string = member.createToken();
        const code: string = await createKey<TokenRepository>(this.tokenRepository, 'code', 40);

        member.tokenInfo = await this.tokenRepository.saveToken(member, newToken, code);

        await this.memberRepository.modify(member);

        return member;
    };

    async signUp(createMemberDto: CreateMemberDto): Promise<void> {
        const member = new Member();
        member.dataMigration(createMemberDto);

        for (const key of duplicateCheckKeys) {
            const resultDuplicate = await this.memberRepository.duplicateCheck(key, member[key]);

            if (resultDuplicate) {
                throw Message.ALREADY_EXIST(key);
            }
        }

        member.passwordEncrypt();

        const result: Member = await this.memberRepository.signUp(member);

        if (!result) {
            throw Message.SERVER_ERROR;
        }
    }

    async duplicateCheck(duplicateCheckDto: DuplicateCheckMemberDto): Promise<boolean> {
        const {type, value} = duplicateCheckDto;
        const result = await this.memberRepository.duplicateCheck(duplicateCheckKeys[type], value);

        return !result;
    }

    async imgUpdate(file: FileType) {
        const profileImgKey = 'imgs/' + await createKey(this.memberRepository, 'profile_img_key', 16) + '_' + Date.now() + '.' + file.fileType;

        console.log(profileImgKey)

        writeFileSync(global.filePath + profileImgKey, file.fileBuffer);
    }


}
