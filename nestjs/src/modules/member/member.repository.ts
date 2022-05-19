import {Member} from "./entities/member.entity";
import {EntityRepository, Repository} from "typeorm";
import {getUpdateObject} from "utils/utils";

const memberSelectKeys: any = ["idx", "id", "nickname", "email", "admin", "profile_img_key", "auth_type", "ip", "user_agent", "created_at"];
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
            select: [...memberSelectKeys, ... additionalKeys],
            relations: ["tokenInfo"],
            where
        });
    }

    async login(member: Member): Promise<Member> {
        const {id, password} = member;

        return await this.findOne({
            select: memberSelectKeys,
            relations: ["tokenInfo"],
            where: {id, password}
        });
    }

    async signUp(member: Member): Promise<Member> {
        const {id, password, nickname, email} = member;

        return await this.save({
            id,
            password,
            nickname,
            email
        });
    }

    async updateMember(member: Member) {
        const obj = getUpdateObject(memberUpdateKeys, member, true);

        return await this.update(member.idx, obj);
    }

    async duplicateCheck(type, value) {
        return await this.findOne({
            [type]: value
        });
    }

}