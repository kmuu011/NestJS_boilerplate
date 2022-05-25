"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrefixMiddleware = void 0;
const common_1 = require("@nestjs/common");
const xss_1 = require("../../../libs/xss");
let PrefixMiddleware = class PrefixMiddleware {
    async use(req, res, next) {
        xss_1.default.check(req.body);
        xss_1.default.check(req.query);
        req.locals = {};
        next();
    }
};
PrefixMiddleware = __decorate([
    (0, common_1.Injectable)()
], PrefixMiddleware);
exports.PrefixMiddleware = PrefixMiddleware;
//# sourceMappingURL=prefix.middleware.js.map