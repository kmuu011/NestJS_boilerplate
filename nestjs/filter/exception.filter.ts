import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from '@nestjs/common';
import {Request, Response} from 'express';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import {sentry} from "../config/config";

Sentry.init({
    dsn: sentry.dsn,

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});


@Catch(HttpException)
export class ControllableExceptionFilter implements ExceptionFilter {
    async catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        const req = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const response: any = exception.getResponse();
        const stack = exception?.stack.toString() || '';

        const {error, message} = response;

        console.log('HttpExceptionFilter log');
        console.log(exception)

        const transaction = Sentry.startTransaction({
            op: "test",
            name: "My First Test Transaction",
        });

        if(status >= 500){
            Sentry.captureException(exception);
        }

        res
            .status(status)
            .json({
                statusCode: status,
                error,
                message: message.toString().replace(/\,/g, '\n')
            });
    }
}

@Catch()
export class OutOfControlExceptionFilter implements ExceptionFilter {
    async catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        const req = ctx.getRequest<Request>();
        const stack = exception?.stack?.toString() || '';

        console.log('OutOfControlException log');
        console.log(exception);

        Sentry.captureException(exception);

        res
            .status(500)
            .json({
                statusCode: 500,
                code: 'out_of_control_serve_error',
                message: '지정되지 않은 오류가 발생했습니다.' +
                    '\n빠른 시일 내에 수정 될 예정입니다.' +
                    '\n이용해 주셔서 감사합니다.'
            });
    }
}