"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentryInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const sentry_service_1 = require("./sentry.service");
let SentryInterceptor = class SentryInterceptor {
    constructor(sentryService) {
        this.sentryService = sentryService;
    }
    intercept(context, next) {
        const span = this.sentryService.startChild({ op: `route handler`, description: "Test" });
        return next.handle().pipe((0, rxjs_1.catchError)((error) => {
            return (0, rxjs_1.throwError)(() => error);
        }), (0, rxjs_1.finalize)(() => {
            span.finish();
            this.sentryService.span.finish();
        }));
    }
};
SentryInterceptor = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [sentry_service_1.SentryService])
], SentryInterceptor);
exports.SentryInterceptor = SentryInterceptor;
//# sourceMappingURL=sentry.interceptor.js.map