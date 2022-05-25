import { LocalsType } from "../type/type";
declare module 'express' {
    interface Request {
        locals: LocalsType;
    }
}
