import * as Sentry from '@sentry/node';
import { SentryService } from './sentry.service';
import { SentryInterceptor } from './sentry.interceptor';
export declare const SENTRY_OPTIONS = "SENTRY_OPTIONS";
export declare class SentryModule {
    static forRoot(options: Sentry.NodeOptions): {
        module: typeof SentryModule;
        providers: (typeof SentryService | {
            provide: string;
            useValue: Sentry.NodeOptions;
            useClass?: undefined;
        } | {
            provide: string;
            useClass: typeof SentryInterceptor;
            useValue?: undefined;
        })[];
        exports: (typeof SentryService)[];
    };
}
