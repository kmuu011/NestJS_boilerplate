import {InsertResult} from "typeorm";

export const getInsertResult = (): InsertResult => {
    const insertResult: InsertResult = new InsertResult();

    insertResult.generatedMaps = [];
    insertResult.raw = [];

    return insertResult;
}

