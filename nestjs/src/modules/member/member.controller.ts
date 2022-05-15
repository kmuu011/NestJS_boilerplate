import {
    Body,
    Controller,
    Get,
    Patch,
    Post,
    Req, Res,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {Request, Response} from "express";

import {MemberService} from './member.service';

import {LoginMemberDto} from "./dto/login-member.dto";
import {CreateMemberDto} from "./dto/create-member-dto";
import {DuplicateCheckMemberDto} from "./dto/duplicate-check-member.dto";
import {Member} from "./entities/member.entity"

import {AuthGuard} from "guard/auth.guard";
import {UpdateMemberDto} from "./dto/update-member.dto";
import {FileInterceptor} from "@nestjs/platform-express";

import {multerOptions} from "config/config";
import * as validator from "libs/validator";
import {FileType} from "../../type/type";
import {Message} from "libs/message";

const duplicateCheckKeys = ['id', 'nickname', 'email'];


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
        for (const key of duplicateCheckKeys) {
            const usable = await this.memberService.duplicateCheck(key, createMemberDto[key]);

            if (!usable) {
                throw Message.ALREADY_EXIST(key);
            }
        }

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
        for (const key of duplicateCheckKeys) {
            if(key === 'id') continue;

            const usable = await this.memberService.duplicateCheck(key, updateMemberDto[key]);

            if (!usable && memberInfo[key] !== updateMemberDto[key]) {
                throw Message.ALREADY_EXIST(key);
            }
        }

        if(memberInfo.auth_type === 0 && updateMemberDto.originalPassword === undefined){
            throw Message.INVALID_PARAM('originalPassword');
        }

        await this.memberService.updateMember(updateMemberDto, memberInfo);

        return {
            result: true
        }
    }

    @Patch('img')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file', multerOptions))
    async img(
        @Req() req: Request,
        @UploadedFile() file
    ){
        const memberInfo = req.res.locals.memberInfo;
        const arrangedFile: FileType = (validator.file([file], 10, validator.type.img))[0];

        await this.memberService.imgUpdate(arrangedFile);




        return {
            result: true
        }
    }

    
    //업로드한 이미지 다운로드 테스트
    @Get('img')
    async getImg(
        @Res() res:Response
    ){
        res.download(global.filePath + 'imgs/hvhx9n35gd32yugm_1652451176060.jpg', 'test.jpg');
    }


    @Get('/duplicateCheck')
    async duplicateCheck(
        @Body() duplicateCheckDto: DuplicateCheckMemberDto
    ) {
        const { type, value } = duplicateCheckDto;

        return {
            usable: await this.memberService.duplicateCheck(duplicateCheckKeys[type], value)
        };
    }


}
