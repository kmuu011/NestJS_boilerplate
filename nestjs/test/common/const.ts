import {DeleteResult, UpdateResult} from "typeorm";

export const getUpdateResult = (): UpdateResult => {
    const updateResult: UpdateResult = new UpdateResult();

    updateResult.generatedMaps = [];
    updateResult.raw = [];
    updateResult.affected = 1;

    return updateResult;
}

export const getDeleteResult = (): DeleteResult => {
    const deleteResult: DeleteResult = new DeleteResult();

    deleteResult.raw = [];
    deleteResult.affected = 1;

    return deleteResult;
}

export const mockConnection = {
    transaction: jest.fn(),
    getCustomRepository: jest.fn(),
    createQueryRunner: () => ({
        connect: jest.fn(),
        startTransaction: jest.fn(),
        commitTransaction: jest.fn(),
        rollbackTransaction: jest.fn(),
        release: jest.fn(),
        manager: {
            save: (r => r)
        }
    })
}
