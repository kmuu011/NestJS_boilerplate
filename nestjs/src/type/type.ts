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