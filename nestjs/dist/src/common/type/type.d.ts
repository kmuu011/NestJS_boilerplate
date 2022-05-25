/// <reference types="node" />
import { Member } from "../../modules/member/entities/member.entity";
import { TodoGroup } from "../../modules/todoGroup/entities/todoGroup.entity";
import { Todo } from "../../modules/todoGroup/todo/entities/todo.entity";
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
export interface SelectListResponseType<T> {
    items: T[];
    page: number;
    count: number;
    totalCount: number;
    last: number;
}
export interface LocalsType {
    memberInfo?: Member;
    todoGroupInfo?: TodoGroup;
    todoInfo?: Todo;
}
export interface LoginResponseType {
    tokenCode: string;
}
export interface ResponseBooleanType {
    [key: string]: boolean;
}
