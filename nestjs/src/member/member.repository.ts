import {Member} from "./entities/member.entity";
import {EntityRepository, Repository} from "typeorm";

const memberSelectKeys: any = ["idx", "id", "nickname", "email", "admin", "profile_img_key", "auth_type", "ip", "user_agent", "created_at"];
const memberUpdateKeys: string[] = ["nickname", "email", "profile_img_key", "ip", "user_agent", "password"];

@EntityRepository(Member)
export class MemberRepository extends Repository<Member> {

    async select(member: Member): Promise<Member> {
        const {idx} = member;

        return await this.findOne({
            select: memberSelectKeys,
            relations: ["tokenInfo"],
            where: {idx}
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

    async modify(member: Member) {
        const obj = {};

        for (const key of memberUpdateKeys) {
            if (member[key] === undefined) continue;
            obj[key] = member[key];
        }

        return await this.update(member.idx, obj);
    }

    async duplicateCheck(type, value) {
        return await this.findOne({
            [type]: value
        });
    }

}