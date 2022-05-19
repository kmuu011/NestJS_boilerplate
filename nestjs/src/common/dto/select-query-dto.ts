import {IsNumber, IsOptional} from "class-validator";

export class SelectQueryDto {
    @IsOptional()
    @IsNumber()
    page: number = 1;

    @IsOptional()
    @IsNumber()
    count: number = 10;
}