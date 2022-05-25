import { BaseEntity, Repository } from "typeorm";
export declare const activeQuestionMark: (data: any) => void;
export declare const deActiveQuestionMark: (data: any) => void;
export declare const createKey: <T extends Repository<BaseEntity>>(repository: T, key: string, length: number) => Promise<string>;
export declare const getUpdateObject: <T>(keys: string[], entity: T, includeUpdateAt: boolean) => any;
