import { BaseEntity } from 'typeorm';
import { Member } from "./member.entity";
export declare class Token extends BaseEntity {
    idx: number;
    member: Member;
    token: string;
    code: string;
}
