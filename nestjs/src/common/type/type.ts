import Buffer from "buffer";

export interface FileType {
    fileType: string
    fileName: string
    fileBuffer: Buffer
    fileSize: number
}

export interface ValidatorType {
    reg: RegExp,
    msg: string
}

export interface ValidatorTypeObj {
    [key: string]: ValidatorType
}

export interface SelectObject<T> {
    items: T[],
    page: number,
    count: number
    totalCount: number;
    last: number
}

// export interface LocalsType<T> {
//     memberInfo: T,
//     todoGroupInfo: T
// }
//
// declare module 'express' {
//     export interface Response{
//         locals: LocalsType<T>
//     }
// }