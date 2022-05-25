"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.createToken = exports.encryptPassword = void 0;
const config_1 = require("../config/config");
const message_1 = require("./message");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const expireTime = config_1.auth.expireTime;
const jwtSecret = config_1.auth.jwtSecret;
const encryptPassword = (password) => {
    return crypto
        .createHash(config_1.auth.hashAlgorithm)
        .update(password + config_1.auth.salt)
        .digest('hex');
};
exports.encryptPassword = encryptPassword;
const createToken = (payloadObj) => {
    return jwt.sign(payloadObj, jwtSecret, { expiresIn: expireTime });
};
exports.createToken = createToken;
const decodeToken = async (token) => {
    const jwtPayload = await new Promise(async (resolve) => {
        if (token === undefined)
            resolve(undefined);
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) {
                resolve(undefined);
            }
            resolve(decoded);
        });
    });
    if (jwtPayload === undefined) {
        throw message_1.Message.UNAUTHORIZED;
    }
    return jwtPayload;
};
exports.decodeToken = decodeToken;
//# sourceMappingURL=member.js.map