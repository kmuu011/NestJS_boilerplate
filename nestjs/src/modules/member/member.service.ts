import {Injectable} from '@nestjs/common';
import {MemberRepository} from "./member.repository";
import {Member} from "./entities/member.entity";
import {CreateMemberDto} from "./dto/create-member-dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Message} from "../../../libs/message";
import {LoginMemberDto} from "./dto/login-member.dto";
import {TokenRepository} from "./token/token.repository";
import {createKey} from "../../../libs/utils";

import {writeFileSync, existsSync, unlinkSync, readFileSync} from "fs";

import {FileType} from "../../common/type/type";
import {UpdateMemberDto} from "./dto/update-member.dto";
import {encryptPassword} from "../../../libs/member";
import {staticPath, filePath} from "../../../config/config";
import {Connection, DeleteResult} from "typeorm";
import {TodoGroup} from "../todoGroup/entities/todoGroup.entity";
import {TodoGroupRepository} from "../todoGroup/todoGroup.repository";
import {Token} from "./entities/token.entity";

@Injectable()
export class MemberService {
    constructor(
        @InjectRepository(MemberRepository) private readonly memberRepository: MemberRepository,
        @InjectRepository(TokenRepository) private readonly tokenRepository: TokenRepository,
        @InjectRepository(TodoGroupRepository) private readonly todoGroupRepository: TodoGroupRepository,
        private readonly connection: Connection
    ) {}

    async auth(headers): Promise<void> {
        const member: Member = new Member();
        member.dataMigration({
            user_agent: headers["user_agent"],
            ip: headers["ip"]
        });

        await member.decodeToken();
    }

    async select(member): Promise<Member> {
        return this.memberRepository.select(member);
    }

    async login(loginMemberDto: LoginMemberDto, headers): Promise<Member> {
        const member: Member = new Member();
        const {ip, "user-agent": user_agent} = headers;
        member.dataMigration(loginMemberDto);

        member.passwordEncrypt();

        const loginResult: Member = await this.memberRepository.select(member, 'id, password');

        if (!loginResult) {
            throw Message.WRONG_ID_OR_PASSWORD;
        }

        member.dataMigration({
            ...loginResult,
            ...{ip, user_agent}
        });

        const newToken: string = member.createToken();
        const code: string = await createKey<TokenRepository>(this.tokenRepository, 'code', 40);

        const token: Token = (await this.tokenRepository.select(undefined, member)) ?? new Token();

        token.dataMigration({member, code, token: newToken});

        member.tokenInfo = await this.tokenRepository.saveToken(token);

        await this.memberRepository.updateMember(member);

        return member;
    };

    async signUp(createMemberDto: CreateMemberDto): Promise<Member> {
        const queryRunner = this.connection.createQueryRunner();
        const member = new Member();
        member.dataMigration(createMemberDto);
        member.passwordEncrypt();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        let resultMember: Member;

        try {
            resultMember = await this.memberRepository.signUp(queryRunner, member);

            if (!resultMember) {
                throw Message.SERVER_ERROR;
            }

            const todoGroup: TodoGroup = new TodoGroup();

            todoGroup.dataMigration({
                title: "????????????",
                member: resultMember
            });

            const resultTodoGroup: TodoGroup = await this.todoGroupRepository.createTodoGroup(queryRunner, todoGroup);

            if(!resultTodoGroup){
                throw Message.SERVER_ERROR;
            }

            await queryRunner.commitTransaction();
        } catch (e) {
            await queryRunner.rollbackTransaction();
            throw e;
        } finally {
            await queryRunner.release();
        }

        return resultMember;
    }

    async duplicateCheck(key: string, value: string): Promise<boolean> {
        return !(await this.memberRepository.duplicateCheck(key, value));
    }

    async updateMember(updateMemberDto: UpdateMemberDto, member: Member): Promise<void> {
        const memberInfo = await this.memberRepository.select(member, undefined,true);

        if(memberInfo.auth_type === 0) {
            updateMemberDto.originalPassword = encryptPassword(updateMemberDto.originalPassword);

            if (updateMemberDto.originalPassword !== memberInfo.password) {
                throw Message.CUSTOM_ERROR("?????? ??????????????? ????????????.")
            }

            if(updateMemberDto.password !== undefined){
                updateMemberDto.password = encryptPassword(updateMemberDto.password);
            }
        }

        memberInfo.dataMigration(updateMemberDto);

        const updateResult = await this.memberRepository.updateMember(memberInfo);

        if(updateResult.affected !== 1){
            throw Message.SERVER_ERROR;
        }
    }

    async signOut(member: Member): Promise<DeleteResult> {
        return await this.memberRepository.signOut(member);
    }

    async updateImg(file: FileType, member: Member): Promise<string> {
        const originalProfileImgKey = member.profile_img_key;
        const profileImgKey = filePath.profileImg + await createKey(this.memberRepository, 'profile_img_key', 16) + '_' + Date.now() + '.' + file.fileType;

        member.dataMigration({profile_img_key: profileImgKey});

        const updateResult = await this.memberRepository.updateMember(member);

        if(updateResult.affected !== 1) {
            throw Message.SERVER_ERROR;
        }

        writeFileSync(staticPath + profileImgKey, file.fileBuffer);

        if(originalProfileImgKey !== undefined && existsSync(staticPath + originalProfileImgKey)) {
            unlinkSync(staticPath + originalProfileImgKey);
        }

        return profileImgKey;
    }

    async deleteImg(member: Member): Promise<void> {
        const originalProfileImgKey = member.profile_img_key;

        member.dataMigration({profile_img_key: null});

        const updateResult = await this.memberRepository.updateMember(member);

        if(updateResult.affected !== 1){
            throw Message.SERVER_ERROR;
        }

        if(originalProfileImgKey !== undefined && existsSync(staticPath + originalProfileImgKey)){
            unlinkSync(staticPath + originalProfileImgKey);
        }
    }

}
