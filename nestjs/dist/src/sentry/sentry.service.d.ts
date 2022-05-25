import { Request } from 'express';
import { Span, SpanContext } from '@sentry/types';
export declare class SentryService {
    private request;
    get span(): Span;
    constructor(request: Request);
    startChild(spanContext: SpanContext): Span;
}
