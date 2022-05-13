import {BaseEntity, Repository} from "typeorm";
import {AST} from "eslint";
import Token = AST.Token;
import {TokenRepository} from "../src/modules/member/token.repository";

const textReplace = (data, key, from, to): void => {
    if (data[key] === undefined || data[key] === null) return;

    if ((data[key].constructor === Array && data[key].length !== 0) || data[key].constructor === Object) {
        dataSortForTextReplace(data[key], from, to);
    } else if (data[key].constructor === String) {
        data[key] = data[key].toString().replace(from, to);
    }
};

const dataSortForTextReplace = (data, from, to): void => {
    if (data === undefined) return;

    if (data.constructor === Array && data.length !== 0) {
        for (let i=0 ; i<data.length ; i++) {
            textReplace(data, i, from, to);
        }
    } else if (data.constructor === Object && Object.keys(data).length !== 0) {
        for (const k in data) {
            if (!data.hasOwnProperty(k)) continue;
            textReplace(data, k, from, to);
        }
    }
};

const ranStr = 'qwertyuiopasdfghjklzxcvbnm0123456789';

export const activeQuestionMark = (data): void => {
    dataSortForTextReplace(data, /\？/g, '?');
}

export const deActiveQuestionMark = (data): void => {
    dataSortForTextReplace(data, /\?/g, '？');
}

export const createKey = async <T extends Repository<BaseEntity>> (repository: T, key: string, length: number) => {
    length = length || 32;

    let createComplete;
    let ranKey = '';

    while (!createComplete) {
        for (let i=0 ; i<length ; i++) {
            const ranNum = Math.floor(Math.random()*ranStr.length);
            const s = ranStr[ranNum];

            ranKey += s;
        }

        const result = await repository.findOne({
            where: {
                [key]: ranKey
            }
        });

        if(!result) createComplete = true;
    }

    return ranKey;
}



