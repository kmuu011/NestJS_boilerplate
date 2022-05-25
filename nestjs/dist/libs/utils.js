"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpdateObject = exports.createKey = exports.deActiveQuestionMark = exports.activeQuestionMark = void 0;
const textReplace = (data, key, from, to) => {
    if (data[key] === undefined || data[key] === null)
        return;
    if ((data[key].constructor === Array && data[key].length !== 0) || data[key].constructor === Object) {
        dataSortForTextReplace(data[key], from, to);
    }
    else if (data[key].constructor === String) {
        data[key] = data[key].toString().replace(from, to);
    }
};
const dataSortForTextReplace = (data, from, to) => {
    if (data === undefined)
        return;
    if (data.constructor === Array && data.length !== 0) {
        for (let i = 0; i < data.length; i++) {
            textReplace(data, i, from, to);
        }
    }
    else if (data.constructor === Object && Object.keys(data).length !== 0) {
        for (const k in data) {
            if (!data.hasOwnProperty(k))
                continue;
            textReplace(data, k, from, to);
        }
    }
};
const ranStr = 'qwertyuiopasdfghjklzxcvbnm0123456789';
const activeQuestionMark = (data) => {
    dataSortForTextReplace(data, /\？/g, '?');
};
exports.activeQuestionMark = activeQuestionMark;
const deActiveQuestionMark = (data) => {
    dataSortForTextReplace(data, /\?/g, '？');
};
exports.deActiveQuestionMark = deActiveQuestionMark;
const createKey = async (repository, key, length) => {
    length = length || 32;
    let createComplete;
    let ranKey = '';
    while (!createComplete) {
        for (let i = 0; i < length; i++) {
            const ranNum = Math.floor(Math.random() * ranStr.length);
            const s = ranStr[ranNum];
            ranKey += s;
        }
        const result = await repository.findOne({
            where: {
                [key]: ranKey
            }
        });
        if (!result)
            createComplete = true;
    }
    return ranKey;
};
exports.createKey = createKey;
const getUpdateObject = (keys, entity, includeUpdateAt) => {
    const obj = {};
    if (includeUpdateAt) {
        obj.updated_at = 'now()';
    }
    for (const key of keys) {
        if (entity[key] === undefined)
            continue;
        obj[key] = entity[key];
    }
    return obj;
};
exports.getUpdateObject = getUpdateObject;
//# sourceMappingURL=utils.js.map