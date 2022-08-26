import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {
    ControllableExceptionFilter,
    OutOfControlExceptionFilter
  } from 'src/common/filter/exception.filter';

import {port} from 'config/config';
import {ValidationPipe} from "@nestjs/common";
import {Handlers} from "@sentry/node";
import {sentrySettingRun} from "./sentry/cli/createRelease";
import {json} from "express";
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';

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
    app.use(json({ limit: '50mb' }));

    const config = new DocumentBuilder()
        .setTitle('Nestjs Boiler Plate Example')
        .setDescription('The Nestjs Boiler Plate API description')
        .setVersion(process.env.npm_package_version)
        .addTag('Nestjs Boiler Plate')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await sentrySettingRun();

    app.use(Handlers.requestHandler());

    // 인터셉터 사용 방법
    // app.useGlobalInterceptors(new TestInterceptor());

    app.useGlobalPipes(new ValidationPipe(validationOptions));

    // app.setGlobalPrefix('api');

    // 예상 범위 밖의 예외 필터
    app.useGlobalFilters(new OutOfControlExceptionFilter());

    // 예상 범위 내의 예외 필터
    app.useGlobalFilters(new ControllableExceptionFilter());

    await app.listen(port);
}

bootstrap();
