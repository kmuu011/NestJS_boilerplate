"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.file = exports.type = void 0;
const message_1 = require("./message");
exports.type = {
    img: {
        reg: /^jpg$|^jpeg$|^png$/,
        msg: 'jpg, jpeg, png 형식의 파일만 업로드 할 수 있습니다.'
    },
};
const file = (files, maxSize, type) => {
    const fileList = [];
    if (files === undefined) {
        throw message_1.Message.INVALID_PARAM('file');
    }
    for (let i = 0; i < files.length; i++) {
        const f = files[i];
        let fileType = f.originalname.substring(f.originalname.lastIndexOf('.') + 1);
        fileType = fileType.toLowerCase();
        const fileName = f.originalname.substring(0, f.originalname.lastIndexOf('.'));
        const fileBuffer = f.buffer;
        const fileSize = f.size;
        if (fileSize / 1024 / 1024 > maxSize) {
            throw message_1.Message.FILE_TOO_LARGE(maxSize);
        }
        if (type !== undefined) {
            if (!(type.reg).test(fileType)) {
                throw message_1.Message.CUSTOM_ERROR(type.msg);
            }
        }
        fileList.push({
            fileType, fileName, fileBuffer, fileSize
        });
    }
    return fileList;
};
exports.file = file;
//# sourceMappingURL=validator.js.map