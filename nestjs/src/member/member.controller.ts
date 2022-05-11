import {Body, Controller, Get, Post, Req, Res, UseGuards} from '@nestjs/common';
import {Request, Response} from "express";

import {MemberService} from './member.service';

import {LoginMemberDto} from "./dto/login-member.dto";
import {CreateMemberDto} from "./dto/create-member-dto";
import {DuplicateCheckMemberDto} from "./dto/duplicate-check-member.dto";
import {Member} from "./entities/member.entity"

import {AuthGuard} from "guard/auth.guard";

@Controller('/member')
export class MemberController {
    constructor(
        private readonly memberService: MemberService,
    ) {}

    @Post('/auth')
    @UseGuards(AuthGuard)
    async auth(
        @Req() req: Request
    ) {
        const memberInfo = req.body.memberInfo;

        return {
            memberInfo
        };
    }

    @Post('/login')
    async login(
        @Req() req: Request,
        @Res() res: Response,
        @Body() loginMemberDto: LoginMemberDto
    ) {
        const member: Member = await this.memberService.login(loginMemberDto, req.headers);

        res.json({
            tokenCode: member.tokenInfo.code
        });
    }

    @Post('/signUp')
    async signUp(
        @Body() createMemberDto: CreateMemberDto
    ) {
        await this.memberService.signUp(createMemberDto);

        return {
            result: true
        };
    }


    @Get('/duplicateCheck')
    async duplicateCheck(
        @Body() duplicateCheckDto: DuplicateCheckMemberDto
    ) {
        return {
            result: await this.memberService.duplicateCheck(duplicateCheckDto)
        };
    }


}
