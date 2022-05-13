import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';

import {TodoModule} from './modules/todo/todo.module';
import {MemberModule} from "./modules/member/member.module";

import {PrefixMiddleware} from "middleware/prefix.middleware";
import {LoggerMiddleware} from "middleware/logger.middleware";

import {TypeOrmModule} from "@nestjs/typeorm";
import {typeOrmOptions} from "config/config";

@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmOptions),
        MemberModule,
        TodoModule,
    ]
})

export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {

        // API 호출 로깅 미들웨어
        consumer.apply(LoggerMiddleware).forRoutes('*');

        // 데이터 파싱 미들웨어
        consumer.apply(PrefixMiddleware).forRoutes('*');
    }
}
