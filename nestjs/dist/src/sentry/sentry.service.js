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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentryService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const Sentry = require("@sentry/node");
let SentryService = class SentryService {
    constructor(request) {
        this.request = request;
        const { method, headers, url } = this.request;
        const transaction = Sentry.startTransaction({
            name: `Route: ${method} ${url}`,
            op: 'transaction',
        });
        Sentry.getCurrentHub().configureScope((scope) => {
            scope.setSpan(transaction);
            scope.setContext('http', {
                method,
                url,
                headers,
            });
        });
    }
    get span() {
        return Sentry.getCurrentHub().getScope().getSpan();
    }
    startChild(spanContext) {
        return this.span.startChild(spanContext);
    }
};
SentryService = __decorate([
    (0, common_2.Injectable)({ scope: common_1.Scope.REQUEST }),
    __param(0, (0, common_2.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [Object])
], SentryService);
exports.SentryService = SentryService;
//# sourceMappingURL=sentry.service.js.map