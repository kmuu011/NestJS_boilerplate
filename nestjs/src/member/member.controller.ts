import {
    Body,
    Controller,
    Get,
    Patch,
    Post,
    Req,
    UploadedFile, UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {Request} from "express";

import {MemberService} from './member.service';

import {LoginMemberDto} from "./dto/login-member.dto";
import {CreateMemberDto} from "./dto/create-member-dto";
import {DuplicateCheckMemberDto} from "./dto/duplicate-check-member.dto";
import {Member} from "./entities/member.entity"

import {AuthGuard} from "guard/auth.guard";
import {UpdateMemberDto} from "./dto/update-member.dto";
import {FileInterceptor, FilesInterceptor} from "@nestjs/platform-express";

import {multerOptions} from "config/config";

import * as validator from "libs/validator";

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
        @Body() loginMemberDto: LoginMemberDto
    ) {
        const member: Member = await this.memberService.login(loginMemberDto, req.headers);

        return {
            tokenCode: member.tokenInfo.code
        }
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

    @Patch('/')
    @UseGuards(AuthGuard)
    async patch(
        @Req() req: Request,
        @Body() updateMemberDto: UpdateMemberDto
    ){

        const memberInfo = req.res.locals.memberInfo;
        console.log(memberInfo instanceof Member)

        return {
            result: true
        }
    }

    @Patch('img')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file', multerOptions))
    async img(
        @UploadedFile() file
    ){

        file = (validator.file([file], 10, validator.type.img))[0];

        console.log(file);

        return {
            result: true
        }
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
