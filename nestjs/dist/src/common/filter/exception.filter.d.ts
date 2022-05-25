import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
export declare class ControllableExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): Promise<void>;
}
export declare class OutOfControlExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): Promise<void>;
}
