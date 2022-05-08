import { Injectable, NestMiddleware } from '@nestjs/common';
import {NextFunction, Request, Response} from "express";
import xss from 'libs/xss';
import {deActiveQuestionMark} from 'libs/utils';

@Injectable()
export class PrefixMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction): Promise<void> {
        xss.check(req.body);
        xss.check(req.query);

        deActiveQuestionMark(req.body);
        deActiveQuestionMark(req.query);

        next();
    }
}