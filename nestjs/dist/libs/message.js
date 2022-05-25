"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const common_1 = require("@nestjs/common");
const messageKeyDescription_1 = require("./messageKeyDescription");
class Message extends common_1.HttpException {
    static INVALID_PARAM(name) {
        return new common_1.HttpException({
            error: `invalid_parameter_${name}`,
            message: `${messageKeyDescription_1.keyDescription[name]}을(를) 입력해주세요.`
        }, common_1.HttpStatus.BAD_REQUEST);
    }
    static WRONG_PARAM(name) {
        return new common_1.HttpException({
            error: `wrong_param_${name}`,
            message: `${messageKeyDescription_1.keyDescription[name]}이(가) 올바르지 않습니다.`
        }, common_1.HttpStatus.BAD_REQUEST);
    }
    static INCLUDE_BAN_KEYWORD(name) {
        return new common_1.HttpException({
            error: `include_ban_keyword_${name}`,
            message: `${messageKeyDescription_1.keyDescription[name]}에 사용할 수 없는 값이 포함되어있습니다.`
        }, common_1.HttpStatus.BAD_REQUEST);
    }
    static NOT_EXIST(name) {
        return new common_1.HttpException({
            error: `not_exist_${name}`,
            message: `${messageKeyDescription_1.keyDescription[name]}이(가) 존재하지 않습니다.`
        }, common_1.HttpStatus.NOT_FOUND);
    }
    static CUSTOM_ERROR(message) {
        return new common_1.HttpException({
            error: `custom_error`,
            message: message
        }, common_1.HttpStatus.BAD_REQUEST);
    }
    static TOO_LARGE_SIZE_FILE(size) {
        return new common_1.HttpException({
            error: `too_large_size_file`,
            message: `${size}MB 이하 파일만 업로드 할 수 있습니다.`
        }, common_1.HttpStatus.PAYLOAD_TOO_LARGE);
    }
    static MAX_SALE_KEYWORD_COUNT(cnt) {
        return new common_1.HttpException({
            error: `max_sale_keyword_count`,
            message: `키워드는 최대 ${cnt}개 까지만 등록할 수 있습니다.`
        }, common_1.HttpStatus.BAD_REQUEST);
    }
    static ALREADY_EXIST(key) {
        return new common_1.HttpException({
            error: `already_exist`,
            message: `이미 존재하는 ${messageKeyDescription_1.keyDescription[key]} 입니다.`
        }, common_1.HttpStatus.BAD_REQUEST);
    }
    static get CONNECTED_SNS() {
        return new common_1.HttpException({
            error: `connected_sns`,
            message: `SNS로그인으로 연결된 계정입니다.\n' +
            '연결한 SNS로그인으로 시도해주세요.`
        }, common_1.HttpStatus.BAD_REQUEST);
    }
    static get FORBIDDEN() {
        return new common_1.HttpException({
            error: `forbidden`,
            message: `해당 기능을 수행할 수 있는 권한이 없습니다.`
        }, common_1.HttpStatus.FORBIDDEN);
    }
    static get UNAUTHORIZED() {
        return new common_1.HttpException({
            error: `unauthorized`,
            message: `로그인 정보가 존재하지 않습니다.`
        }, common_1.HttpStatus.UNAUTHORIZED);
    }
    static get WRONG_ID_OR_PASSWORD() {
        return new common_1.HttpException({
            error: `wrong_id_or_password`,
            message: `아이디 혹은 비밀번호가 일치하지 않습니다.`
        }, common_1.HttpStatus.BAD_REQUEST);
    }
    static get CAN_NOT_ACTION_DEFAULT() {
        return new common_1.HttpException({
            error: `can_not_action_default`,
            message: `기본값은 삭제 또는 변경할 수 없습니다.`
        }, common_1.HttpStatus.BAD_REQUEST);
    }
    static FILE_TOO_LARGE(maxSize) {
        return new common_1.HttpException({
            error: `file_too_large`,
            message: `${maxSize}mb 이하만 업로드할 수 있습니다.`
        }, common_1.HttpStatus.BAD_REQUEST);
    }
    static get EXPIRED_TOKEN() {
        return new common_1.HttpException({
            error: `expired_token`,
            message: `토큰이 만료되었습니다.`
        }, common_1.HttpStatus.UNAUTHORIZED);
    }
    static get SERVER_ERROR() {
        return new common_1.HttpException({
            error: 'server_error',
            message: '예기치 않은 오류가 발생했습니다.\n잠시 뒤에 다시 시도해주세요.'
        }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
exports.Message = Message;
//# sourceMappingURL=message.js.map