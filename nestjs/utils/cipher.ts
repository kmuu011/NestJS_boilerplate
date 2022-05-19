import {ConfigModule} from "../config/configModule";

const crypto = require('crypto');

export class Cipher {
    cipher;

    constructor(
        private readonly configModule: ConfigModule,
    ) {
        this.cipher = configModule.cipher;
    }


    encrypt = (text) => {
        try {
            const cipherIv = crypto.randomBytes(16);
            const enc = crypto.createCipheriv(this.cipher.twoWayAlgorithm, Buffer.from(this.cipher.key), cipherIv);
            let encrypted = enc.update(text);

            encrypted = Buffer.concat([encrypted, enc.final()]);

            return cipherIv.toString('hex') + ':' + encrypted.toString('hex');
        } catch (e) {
            return undefined;
        }
    }

    decrypt = (text) => {
        try {
            const textParts = text.split(':');
            const iv = Buffer.from(textParts.shift(), 'hex');
            const encryptedText = Buffer.from(textParts.join(':'), 'hex');
            const decipher = crypto.createDecipheriv(this.cipher.twoWayAlgorithm, Buffer.from(this.cipher.key), iv);
            let decrypted = decipher.update(encryptedText);

            decrypted = Buffer.concat([decrypted, decipher.final()]);

            return decrypted.toString();
        } catch (e) {
            return undefined;
        }

    }
}
