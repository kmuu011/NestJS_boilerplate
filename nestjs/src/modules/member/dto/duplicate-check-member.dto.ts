import {IsNotEmpty, IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class DuplicateCheckMemberDto {
    @IsNumber()
    @ApiProperty({
        example: 0
    })
    readonly type: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'tts'
    })
    readonly value: string;
}