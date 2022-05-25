import { Member } from "./entities/member.entity";
import { Repository, UpdateResult } from "typeorm";
export declare class MemberRepository extends Repository<Member> {
    select(member: Member, selectKeys?: string, includePassword?: boolean): Promise<Member>;
    login(member: Member): Promise<Member>;
    signUp(member: Member): Promise<Member>;
    updateMember(member: Member): Promise<UpdateResult>;
    duplicateCheck(type: any, value: any): Promise<Member>;
}
