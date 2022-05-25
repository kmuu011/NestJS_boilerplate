import { Token } from "./token.entity";
import { BaseEntity } from 'typeorm';
import { JwtPayload } from "jsonwebtoken";
import { TodoGroup } from "../../todoGroup/entities/todoGroup.entity";
export declare class Member extends BaseEntity {
    idx: number;
    id: string;
    password: string;
    password_encrypted: boolean;
    nickname: string;
    email: string;
    profile_img_key: string;
    admin: number;
    created_at: string;
    updated_at: string;
    auth_type: number;
    auth_id: string;
    ip: string;
    user_agent: string;
    keep_check: boolean;
    tokenInfo: Token;
    todoGroupList: TodoGroup[];
    passwordEncrypt(): void;
    getPayload(): object;
    createToken(): string;
    decodeToken(): Promise<JwtPayload>;
    dataMigration(object: object): void;
}
