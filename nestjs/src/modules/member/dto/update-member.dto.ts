import {IsNotEmpty, IsOptional, IsString} from "class-validator";
import {Member} from "../entities/member.entity";
import {ApiProperty, ApiPropertyOptional, PickType} from "@nestjs/swagger";

export class UpdateMemberDto extends PickType(
    Member,
    ['nickname', 'email'] as const
){
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    password: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    originalPassword: string;
}