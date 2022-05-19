import {Global, MiddlewareConsumer, Module, NestModule} from '@nestjs/common';

import {TodoGroupModule} from './modules/todoGroup/todoGroup.module';
import {MemberModule} from "./modules/member/member.module";

import {PrefixMiddleware} from "middleware/prefix.middleware";
import {LoggerMiddleware} from "middleware/logger.middleware";

import {TypeOrmModule} from "@nestjs/typeorm";
import {MemberRepository} from "./modules/member/member.repository";
import {TokenRepository} from "./modules/member/token/token.repository";
import {MemberUtils} from "../utils/member";
import {ConfigModule} from "../config/configModule";


@Global()
@Module({
    imports: [
        TypeOrmModule.forRoot(new ConfigModule().typeOrmOptions),
        TypeOrmModule.forFeature([
            MemberRepository,
            TokenRepository,
        ]),
        MemberModule,
        TodoGroupModule,
    ],
    providers:[
        ConfigModule,
        MemberUtils
    ],
    exports: [
        TypeOrmModule.forFeature([
            MemberRepository,
            TokenRepository,
        ]),
        ConfigModule,
        MemberUtils
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
