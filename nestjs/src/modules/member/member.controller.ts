import {
    Body,
    Controller, Delete,
    Get, HttpCode,
    Patch,
    Post, Query,
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

import {AuthGuard} from "../../common/guard/auth.guard";
import {UpdateMemberDto} from "./dto/update-member.dto";
import {FileInterceptor} from "@nestjs/platform-express";

import {staticPath, multerOptions} from "../../../config/config";
import * as validator from "../../../libs/validator";
import {FileType, LoginResponseType, ResponseBooleanType} from "../../common/type/type";
import {Message} from "../../../libs/message";
import {ApiBody, ApiConsumes, ApiCreatedResponse, ApiHeader, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {memberAuthResponse} from "../../common/swagger/customResponse";

const duplicateCheckKeys = ['id', 'nickname', 'email'];

@ApiTags('Member')
@Controller('/member')
export class MemberController {
    constructor(
        private readonly memberService: MemberService,
    ) {}

    @Post('/auth')
    @UseGuards(AuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'tokenCode 체크', description: 'tokenCode가 유효한지 체크' })
    @ApiResponse({
        description: '토큰 코드 체크 완료', status: 200,
        type: memberAuthResponse
    })
    @ApiHeader({description: '토큰 코드', name: 'token-code'})
    async auth(
        @Req() req: Request
    ): Promise<Member> {
        const memberInfo = req.locals.memberInfo;

        // console.log(memberInfo);

        return memberInfo;
    }
    
    @Post('/login')
    @HttpCode(200)
    @ApiOperation({ summary: '로그인' })
    @ApiResponse({
        description: '로그인 성공', status: 200,
        type: LoginResponseType
    })
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
    @ApiOperation({ summary: '회원가입' })
    @ApiCreatedResponse({
        description: '회원가입 성공',
        type: ResponseBooleanType
    })
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
    @ApiOperation({ summary: '회원정보 수정' })
    @ApiResponse({
        description: '회원정보 수정 완료',
        status: 200,
        type: ResponseBooleanType
    })
    @ApiHeader({description: '토큰 코드', name: 'token-code'})
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

    @Get('/duplicateCheck')
    @ApiOperation({ summary: '중복 체크' })
    @ApiResponse({
        description: 'true: 중복, false: 중복 아님 사용가능 ',
        status: 200,
        type: ResponseBooleanType,
    })
    async duplicateCheck(
        @Query() duplicateCheckDto: DuplicateCheckMemberDto
    ): Promise<ResponseBooleanType> {
        const {type, value} = duplicateCheckDto;

        return {
            result: await this.memberService.duplicateCheck(duplicateCheckKeys[type], value)
        };
    }

    @Delete('/signOut')
    @UseGuards(AuthGuard)
    @ApiOperation({summary: '회원 탈퇴', description: '탈퇴하고 모든 데이터가 삭제됨.'})
    @ApiResponse({
        status: 200,
        type: ResponseBooleanType,
    })
    @ApiHeader({description: '토큰 코드', name: 'token-code'})
    async signOut(
        @Req() req: Request,
    ): Promise<ResponseBooleanType> {
        await this.memberService.signOut(req.locals.memberInfo);

        return {
            result: true
        }
    }

    @Patch('img')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file', multerOptions))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary'
                }
            }
        }
    })
    @ApiOperation({ summary: '프로필 사진 변경' })
    @ApiResponse({
        description: '프로필 사진 변경 완료',
        status: 200,
        type: ResponseBooleanType,
    })
    @ApiHeader({description: '토큰 코드', name: 'token-code'})
    async updateImg(
        @Req() req: Request,
        @UploadedFile() file
    ): Promise<ResponseBooleanType> {
        const arrangedFile: FileType = (validator.file([file], 10, validator.type.img))[0];

        await this.memberService.updateImg(arrangedFile, req.locals.memberInfo);

        return {
            result: true
        }
    }

    @Delete('img')
    @UseGuards(AuthGuard)
    @ApiHeader({description: '토큰 코드', name: 'token-code'})
    @ApiOperation({ summary: '프로필 사진 삭제' })
    @ApiResponse({
        description: '프로필 사진 삭제 완료',
        status: 200,
        type: ResponseBooleanType,
    })
    async deleteImg(
        @Req() req: Request,
    ): Promise<ResponseBooleanType> {
        await this.memberService.deleteImg(req.locals.memberInfo);

        return {
            result: true
        }
    }

    //업로드한 이미지 다운로드 테스트
    @Get('img')
    @UseGuards(AuthGuard)
    @ApiHeader({description: '토큰 코드', name: 'token-code'})
    @ApiOperation({ summary: '프로필 사진 다운로드' })
    @ApiResponse({
        description: '다운로드 완료',
        status: 200,
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary'
                }
            }
        }
    })
    async getImg(
        @Req() req: Request,
        @Res() res: Response
    ): Promise<void> {
        const member: Member = req.locals.memberInfo;
        const profileImgKey = member.profile_img_key;

        res.download(staticPath + profileImgKey, 'test.jpg');
    }

}
