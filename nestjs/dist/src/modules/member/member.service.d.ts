import { MemberRepository } from "./member.repository";
import { Member } from "./entities/member.entity";
import { CreateMemberDto } from "./dto/create-member-dto";
import { LoginMemberDto } from "./dto/login-member.dto";
import { TokenRepository } from "./token/token.repository";
import { FileType } from "../../common/type/type";
import { UpdateMemberDto } from "./dto/update-member.dto";
export declare class MemberService {
    private memberRepository;
    private tokenRepository;
    constructor(memberRepository: MemberRepository, tokenRepository: TokenRepository);
    auth(headers: any): Promise<void>;
    select(member: any): Promise<Member>;
    login(loginMemberDto: LoginMemberDto, headers: any): Promise<Member>;
    signUp(createMemberDto: CreateMemberDto): Promise<void>;
    duplicateCheck(key: string, value: string): Promise<boolean>;
    updateMember(updateMemberDto: UpdateMemberDto, member: Member): Promise<void>;
    imgUpdate(file: FileType, member: Member): Promise<void>;
    imgDelete(member: Member): Promise<void>;
}
