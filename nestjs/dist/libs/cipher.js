"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const crypto = require('crypto');
const cipherKey = config_1.cipher.key;
exports.default = {
    encrypt: (text) => {
        try {
            const cipherIv = crypto.randomBytes(16);
            const enc = crypto.createCipheriv(config_1.cipher.twoWayAlgorithm, Buffer.from(cipherKey), cipherIv);
            let encrypted = enc.update(text);
            encrypted = Buffer.concat([encrypted, enc.final()]);
            return cipherIv.toString('hex') + ':' + encrypted.toString('hex');
        }
        catch (e) {
            return undefined;
        }
    },
    decrypt: (text) => {
        try {
            const textParts = text.split(':');
            const iv = Buffer.from(textParts.shift(), 'hex');
            const encryptedText = Buffer.from(textParts.join(':'), 'hex');
            const decipher = crypto.createDecipheriv(config_1.cipher.twoWayAlgorithm, Buffer.from(cipherKey), iv);
            let decrypted = decipher.update(encryptedText);
            decrypted = Buffer.concat([decrypted, decipher.final()]);
            return decrypted.toString();
        }
        catch (e) {
            return undefined;
        }
    }
};
//# sourceMappingURL=cipher.js.map