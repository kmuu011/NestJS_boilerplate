import {IsNotEmpty, IsOptional, IsString} from "class-validator";
import {PickType} from "@nestjs/mapped-types";
import {Member} from "../entities/member.entity";

export class UpdateMemberDto extends PickType(
    Member,
    ['nickname', 'email'] as const
){
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    password: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    originalPassword: string;
}