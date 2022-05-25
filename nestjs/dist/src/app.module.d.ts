import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import '@sentry/tracing';
export declare class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any;
}
