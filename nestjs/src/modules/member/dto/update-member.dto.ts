import {IsEmail, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class UpdateMemberDto {
    @IsNotEmpty()
    @IsString()
    readonly nickname: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly password: string;

}