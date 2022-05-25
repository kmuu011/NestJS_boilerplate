"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const exception_filter_1 = require("./common/filter/exception.filter");
const config_1 = require("../config/config");
const common_1 = require("@nestjs/common");
const node_1 = require("@sentry/node");
const appOptions = {
    cors: true
};
const validationOptions = {
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
        enableImplicitConversion: true
    }
};
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, appOptions);
    app.use(node_1.Handlers.requestHandler());
    app.useGlobalPipes(new common_1.ValidationPipe(validationOptions));
    app.setGlobalPrefix('api');
    app.useGlobalFilters(new exception_filter_1.OutOfControlExceptionFilter());
    app.useGlobalFilters(new exception_filter_1.ControllableExceptionFilter());
    await app.listen(config_1.port);
}
bootstrap();
//# sourceMappingURL=main.js.map