"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutOfControlExceptionFilter = exports.ControllableExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const Sentry = require("@sentry/node");
const client_1 = require("@slack/client");
const config_1 = require("../../../config/config");
const webhook = new client_1.IncomingWebhook(config_1.slack.apiLogHook);
function captureSentry(status, api, exception, req) {
    const { query, params } = req;
    Sentry.setContext("desc", {
        exception,
        query, params
    });
    Sentry.captureException(exception);
    if (status >= 500) {
        webhook.send({
            attachments: [
                {
                    color: "danger",
                    text: `🚨${api} 에러 발생`,
                    fields: [
                        {
                            title: `ㅡ${api}ㅡ`,
                            value: exception === null || exception === void 0 ? void 0 : exception.stack,
                            short: false
                        }
                    ],
                    ts: new Date().toString()
                }
            ]
        });
    }
}
let ControllableExceptionFilter = class ControllableExceptionFilter {
    async catch(exception, host) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        const req = ctx.getRequest();
        const status = exception.getStatus();
        const response = exception.getResponse();
        const api = req.originalUrl;
        const { error, message } = response;
        captureSentry(status, api, exception, req);
        res
            .status(status)
            .json({
            statusCode: status,
            error,
            message: message.toString().replace(/\,/g, '\n')
        });
    }
};
ControllableExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], ControllableExceptionFilter);
exports.ControllableExceptionFilter = ControllableExceptionFilter;
let OutOfControlExceptionFilter = class OutOfControlExceptionFilter {
    async catch(exception, host) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        const req = ctx.getRequest();
        const api = req.originalUrl;
        const status = 500;
        captureSentry(status, api, exception, req);
        res
            .status(status)
            .json({
            statusCode: status,
            code: 'out_of_control_serve_error',
            message: '지정되지 않은 오류가 발생했습니다.' +
                '\n빠른 시일 내에 수정 될 예정입니다.' +
                '\n이용해 주셔서 감사합니다.'
        });
    }
};
OutOfControlExceptionFilter = __decorate([
    (0, common_1.Catch)()
], OutOfControlExceptionFilter);
exports.OutOfControlExceptionFilter = OutOfControlExceptionFilter;
//# sourceMappingURL=exception.filter.js.map