import Buffer from "buffer";
import {Member} from "../../modules/member/entities/member.entity";
import {TodoGroup} from "../../modules/todoGroup/entities/todoGroup.entity";

export interface FileType {
    fileType: string;
    fileName: string;
    fileBuffer: Buffer;
    fileSize: number;
}

export interface ValidatorType {
    reg: RegExp;
    msg: string;
}

export interface ValidatorTypeObj {
    [key: string]: ValidatorType;
}

export interface SelectObject<T> {
    items: T[];
    page: number;
    count: number;
    totalCount: number;
    last: number;
}

export interface LocalsType {
    memberInfo?: Member;
    todoGroupInfo?: TodoGroup;
}


