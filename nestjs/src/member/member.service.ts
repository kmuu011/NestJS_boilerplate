import {Injectable} from '@nestjs/common';
import {Request} from "express";
import {MemberRepository} from "./member.repository";
import {Member} from "./entities/member.entity";
import {CreateMemberDto} from "./dto/create-member-dto";
import {InjectRepository} from "@nestjs/typeorm";

const duplicateCheckKeys = ['id', 'nickname', 'email'];

@Injectable()
export class MemberService {
    constructor(
        @InjectRepository(MemberRepository) private memberRepository: MemberRepository,
    ) {}

    async signUp(createMemberDto: CreateMemberDto){
        const result = await this.memberRepository.signUp(createMemberDto);

        console.log(result);

    }


}
