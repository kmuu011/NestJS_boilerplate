import {getInsertResult} from "../../common/const";

export const mockTodoGroupRepository = {
    select: jest.fn().mockImplementation(() => Promise.resolve()),
    findOne: jest.fn().mockImplementation(() => Promise.resolve()),
    createTodoGroup: jest.fn().mockImplementation(() => Promise.resolve(getInsertResult())),
}