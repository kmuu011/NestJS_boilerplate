import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {
    ControllableExceptionFilter,
    OutOfControlExceptionFilter
  } from 'filter/exception.filter';

import {port, sentry} from 'config/config';
import {ValidationPipe} from "@nestjs/common";
import * as Sentry from "@sentry/node";

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

Sentry.init({
    ...sentry,
    integrations: [
        new Sentry.Integrations.Http({tracing: true})
    ]
});

async function bootstrap() {
    const app = await NestFactory.create(AppModule, appOptions);

    app.useGlobalPipes(new ValidationPipe(validationOptions));

    app.setGlobalPrefix('api');

    // 예상 범위 밖의 예외 필터
    app.useGlobalFilters(new OutOfControlExceptionFilter());

    // 예상 범위 내의 예외 필터
    app.useGlobalFilters(new ControllableExceptionFilter());

    await app.listen(port);
}

bootstrap();
