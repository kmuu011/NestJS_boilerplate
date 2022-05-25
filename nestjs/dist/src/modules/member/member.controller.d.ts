import { Request, Response } from "express";
import { MemberService } from './member.service';
import { LoginMemberDto } from "./dto/login-member.dto";
import { CreateMemberDto } from "./dto/create-member-dto";
import { DuplicateCheckMemberDto } from "./dto/duplicate-check-member.dto";
import { Member } from "./entities/member.entity";
import { UpdateMemberDto } from "./dto/update-member.dto";
import { LoginResponseType, ResponseBooleanType } from "../../common/type/type";
export declare class MemberController {
    private readonly memberService;
    constructor(memberService: MemberService);
    auth(req: Request): Promise<Member>;
    login(req: Request, loginMemberDto: LoginMemberDto): Promise<LoginResponseType>;
    signUp(createMemberDto: CreateMemberDto): Promise<ResponseBooleanType>;
    updateMember(req: Request, updateMemberDto: UpdateMemberDto): Promise<ResponseBooleanType>;
    img(req: Request, file: any): Promise<ResponseBooleanType>;
    deleteImg(req: Request): Promise<ResponseBooleanType>;
    getImg(req: Request, res: Response): Promise<void>;
    duplicateCheck(duplicateCheckDto: DuplicateCheckMemberDto): Promise<ResponseBooleanType>;
}
