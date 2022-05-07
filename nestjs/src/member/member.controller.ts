import {Body, Controller, Get, Post, Req} from '@nestjs/common';
import {MemberService} from './member.service';

import {LoginMemberDto} from "./dto/login-member.dto";
import {CreateMemberDto} from "./dto/create-member-dto";
import {DuplicateCheckMemberDto} from "./dto/duplicate-check-member.dto";
import {Message} from "libs/message";

const duplicateCheckKeys = ['id', 'nickname', 'email'];

@Controller('/member')
export class MemberController {
    constructor(
        private readonly memberService: MemberService,
    ) {}

    @Post('/signUp')
    async signUp(
        @Body() createMemberDto: CreateMemberDto
    ){
        const signUpResult = await this.memberService.signUp(createMemberDto);

        return true;
    }



}
