"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const todoGroup_module_1 = require("./modules/todoGroup/todoGroup.module");
const member_module_1 = require("./modules/member/member.module");
const prefix_middleware_1 = require("./common/middleware/prefix.middleware");
const logger_middleware_1 = require("./common/middleware/logger.middleware");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("../config/config");
const member_repository_1 = require("./modules/member/member.repository");
const token_repository_1 = require("./modules/member/token/token.repository");
const todoGroup_repository_1 = require("./modules/todoGroup/todoGroup.repository");
const Sentry = require("@sentry/node");
const sentry_module_1 = require("./sentry/sentry.module");
require("@sentry/tracing");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(Sentry.Handlers.requestHandler()).forRoutes({
            path: '*',
            method: common_1.RequestMethod.ALL,
        });
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes('*');
        consumer.apply(prefix_middleware_1.PrefixMiddleware).forRoutes('*');
    }
};
AppModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            sentry_module_1.SentryModule.forRoot(config_1.sentry),
            typeorm_1.TypeOrmModule.forRoot(config_1.typeOrmOptions),
            typeorm_1.TypeOrmModule.forFeature([
                member_repository_1.MemberRepository,
                token_repository_1.TokenRepository,
            ]),
            member_module_1.MemberModule,
            todoGroup_module_1.TodoGroupModule,
        ],
        exports: [
            typeorm_1.TypeOrmModule.forFeature([
                member_repository_1.MemberRepository,
                token_repository_1.TokenRepository,
                todoGroup_repository_1.TodoGroupRepository,
            ]),
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map