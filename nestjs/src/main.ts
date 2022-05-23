import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {
    ControllableExceptionFilter,
    OutOfControlExceptionFilter
  } from 'src/common/filter/exception.filter';

import {port} from 'config/config';
import {ValidationPipe} from "@nestjs/common";
import {TestInterceptor} from "./common/interceptor/test.interceptor";

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
    const app = await NestFactory.create(AppModule, appOptions);

    app.useGlobalInterceptors(new TestInterceptor());

    app.useGlobalPipes(new ValidationPipe(validationOptions));

    app.setGlobalPrefix('api');

    // 예상 범위 밖의 예외 필터
    app.useGlobalFilters(new OutOfControlExceptionFilter());

    // 예상 범위 내의 예외 필터
    app.useGlobalFilters(new ControllableExceptionFilter());

    await app.listen(port);
}

bootstrap();
