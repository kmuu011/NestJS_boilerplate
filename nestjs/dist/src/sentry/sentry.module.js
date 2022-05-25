"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SentryModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentryModule = exports.SENTRY_OPTIONS = void 0;
const common_1 = require("@nestjs/common");
const Sentry = require("@sentry/node");
const core_1 = require("@nestjs/core");
const sentry_service_1 = require("./sentry.service");
const sentry_interceptor_1 = require("./sentry.interceptor");
exports.SENTRY_OPTIONS = 'SENTRY_OPTIONS';
let SentryModule = SentryModule_1 = class SentryModule {
    static forRoot(options) {
        Sentry.init(options);
        return {
            module: SentryModule_1,
            providers: [
                {
                    provide: exports.SENTRY_OPTIONS,
                    useValue: options,
                },
                sentry_service_1.SentryService,
                {
                    provide: core_1.APP_INTERCEPTOR,
                    useClass: sentry_interceptor_1.SentryInterceptor,
                },
            ],
            exports: [sentry_service_1.SentryService],
        };
    }
};
SentryModule = SentryModule_1 = __decorate([
    (0, common_1.Module)({
        providers: [sentry_service_1.SentryService],
    })
], SentryModule);
exports.SentryModule = SentryModule;
//# sourceMappingURL=sentry.module.js.map