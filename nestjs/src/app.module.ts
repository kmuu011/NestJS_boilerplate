import {Global, MiddlewareConsumer, Module, NestModule} from '@nestjs/common';

import {TodoGroupModule} from './modules/todoGroup/todoGroup.module';
import {MemberModule} from "./modules/member/member.module";

import {PrefixMiddleware} from "middleware/prefix.middleware";
import {LoggerMiddleware} from "middleware/logger.middleware";

import {TypeOrmModule} from "@nestjs/typeorm";
import {typeOrmOptions} from "config/config";
import {MemberRepository} from "./modules/member/member.repository";
import {TokenRepository} from "./modules/member/token/token.repository";
import {TodoGroupRepository} from "./modules/todoGroup/todoGroup.repository";

@Global()
@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmOptions),
        TypeOrmModule.forFeature([
            MemberRepository,
            TokenRepository,
        ]),
        MemberModule,
        TodoGroupModule,
    ],
    exports: [
        TypeOrmModule.forFeature([
            MemberRepository,
            TokenRepository,
            TodoGroupRepository,
        ]),
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
