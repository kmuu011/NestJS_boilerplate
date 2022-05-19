import {Message} from "./message";
import {JwtPayload} from "jsonwebtoken";
import {Injectable} from "@nestjs/common";
import {ConfigModule} from "../config/configModule";

const jwt = require('jsonwebtoken')
const crypto = require('crypto');

@Injectable()
export class MemberUtils {
    auth;

    constructor(
        private readonly configModule: ConfigModule,
    ) {
        this.auth = configModule.auth;
    }

    encryptPassword = (password: string): string => {
        return crypto
            .createHash(this.auth.hashAlgorithm)
            .update(password + this.auth.salt)
            .digest('hex');
    }


    createToken = (payloadObj): string => {
        return jwt.sign(payloadObj, this.auth.jwtSecret, {expiresIn: this.auth.expireTime});
    }

    decodeToken = async (token): Promise<JwtPayload> => {
        const jwtPayload = await new Promise(async (resolve) => {
            if (token === undefined) resolve(undefined);

            jwt.verify(token, this.auth.jwtSecret, (err, decoded) => {
                if (err) {
                    resolve(undefined);
                }
                resolve(decoded);
            })
        })

        if (jwtPayload === undefined) {
            throw Message.UNAUTHORIZED;
        }

        return jwtPayload;
    }
}