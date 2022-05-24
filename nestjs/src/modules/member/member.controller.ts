import {
    Body,
    Controller, Delete,
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

import {AuthGuard} from "src/common/guard/auth.guard";
import {UpdateMemberDto} from "./dto/update-member.dto";
import {FileInterceptor} from "@nestjs/platform-express";

import {basePath, multerOptions} from "config/config";
import * as validator from "libs/validator";
import {FileType, LoginResponseType, ResponseBooleanType} from "../../common/type/type";
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
    ): Promise<Member> {
        const memberInfo = req.locals.memberInfo;

        console.log(memberInfo);


        return memberInfo;
    }

    @Post('/login')
    async login(
        @Req() req: Request,
        @Body() loginMemberDto: LoginMemberDto
    ): Promise<LoginResponseType> {
        const member: Member = await this.memberService.login(loginMemberDto, req.headers);

        return {
            tokenCode: member.tokenInfo.code
        }
    }

    @Post('/signUp')
    async signUp(
        @Body() createMemberDto: CreateMemberDto
    ): Promise<ResponseBooleanType> {
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
    async updateMember(
        @Req() req: Request,
        @Body() updateMemberDto: UpdateMemberDto
    ): Promise<ResponseBooleanType> {
        const memberInfo = req.locals.memberInfo;
        for (const key of duplicateCheckKeys) {
            if (key === 'id') continue;

            const usable = await this.memberService.duplicateCheck(key, updateMemberDto[key]);

            if (!usable && memberInfo[key] !== updateMemberDto[key]) {
                throw Message.ALREADY_EXIST(key);
            }
        }

        if (memberInfo.auth_type === 0 && updateMemberDto.originalPassword === undefined) {
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
    ): Promise<ResponseBooleanType> {
        const arrangedFile: FileType = (validator.file([file], 10, validator.type.img))[0];

        await this.memberService.imgUpdate(arrangedFile, req.locals.memberInfo);

        return {
            result: true
        }
    }

    @Delete('img')
    @UseGuards(AuthGuard)
    async deleteImg(
        @Req() req: Request,
    ): Promise<ResponseBooleanType> {
        await this.memberService.imgDelete(req.locals.memberInfo);

        return {
            result: true
        }
    }

    //업로드한 이미지 다운로드 테스트
    @Get('img')
    @UseGuards(AuthGuard)
    async getImg(
        @Req() req: Request,
        @Res() res: Response
    ): Promise<void> {
        const member: Member = req.locals.memberInfo;
        const profileImgKey = member.profile_img_key;

        res.download(basePath + profileImgKey, 'test.jpg');
    }

    @Get('/duplicateCheck')
    async duplicateCheck(
        @Body() duplicateCheckDto: DuplicateCheckMemberDto
    ): Promise<ResponseBooleanType> {
        const {type, value} = duplicateCheckDto;

        return {
            usable: await this.memberService.duplicateCheck(duplicateCheckKeys[type], value)
        };
    }


}
