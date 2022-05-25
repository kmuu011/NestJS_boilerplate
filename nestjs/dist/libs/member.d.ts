import { JwtPayload } from "jsonwebtoken";
export declare const encryptPassword: (password: string) => string;
export declare const createToken: (payloadObj: any) => string;
export declare const decodeToken: (token: any) => Promise<JwtPayload>;
