import {Member} from "./entities/member.entity";
import {DeleteResult, EntityRepository, QueryRunner, Repository, UpdateResult} from "typeorm";
import {getUpdateObject} from "../../../libs/utils";

const memberSelectKeys: any = ["idx", "id", "nickname", "email", "admin", "profile_img_key", "auth_type", "ip", "user_agent", "created_at", "updated_at"];
const memberUpdateKeys: string[] = ["nickname", "email", "profile_img_key", "ip", "user_agent", "password"];

@EntityRepository(Member)
export class MemberRepository extends Repository<Member> {

    async select(member: Member, selectKeys?: string, includePassword?: boolean): Promise<Member> {
        if(selectKeys === undefined) selectKeys = "idx";
        const selectKeysList = selectKeys.replace(/\s/g, '').split(',');
        const where = {};

        for(const k of selectKeysList){
            where[k] = member[k];
        }

        const additionalKeys = [];

        if(includePassword === true){
            additionalKeys.push('password');
        }

        return await this.findOne({
            select: [...memberSelectKeys, ...additionalKeys],
            relations: ["tokenInfo"],
            where
        });
    }

    async signUp(queryRunner: QueryRunner, member: Member): Promise<Member> {
        if(queryRunner) {
            return await queryRunner.manager.save(member);
        }else{
            return await this.save(member);
        }
    }

    async updateMember(member: Member): Promise<UpdateResult> {
        const obj = getUpdateObject(memberUpdateKeys, member, true);

        return await this.update(member.idx, obj);
    }

    async duplicateCheck(type, value): Promise<Member> {
        return await this.findOne({
            [type]: value
        });
    }

    async signOut(member: Member): Promise<DeleteResult> {
        return await this.delete(member.idx);
    }
}