import { HttpException } from "@nestjs/common";
export declare class Message extends HttpException {
    static INVALID_PARAM(name: any): HttpException;
    static WRONG_PARAM(name: any): HttpException;
    static INCLUDE_BAN_KEYWORD(name: any): HttpException;
    static NOT_EXIST(name: any): HttpException;
    static CUSTOM_ERROR(message: any): HttpException;
    static TOO_LARGE_SIZE_FILE(size: any): HttpException;
    static MAX_SALE_KEYWORD_COUNT(cnt: any): HttpException;
    static ALREADY_EXIST(key: any): HttpException;
    static get CONNECTED_SNS(): HttpException;
    static get FORBIDDEN(): HttpException;
    static get UNAUTHORIZED(): HttpException;
    static get WRONG_ID_OR_PASSWORD(): HttpException;
    static get CAN_NOT_ACTION_DEFAULT(): HttpException;
    static FILE_TOO_LARGE(maxSize: any): HttpException;
    static get EXPIRED_TOKEN(): HttpException;
    static get SERVER_ERROR(): HttpException;
}
