import {Member} from "./entities/member.entity";
import {EntityRepository, Repository} from "typeorm";

const memberSelectKeys: any = ["idx", "id", "nickname", "email", "admin", "profile_img_key", "auth_type", "ip", "user_agent", "token", "created_at"];
const memberUpdateKeys: string[] = ["nickname", "email", "profile_img_key", "ip", "user_agent", "token", "password"];

@EntityRepository(Member)
export class MemberRepository extends Repository<Member> {

    async select(member: Member): Promise<Member> {
        const { idx } = member;

        return await this.findOne({
            select: memberSelectKeys,
            where: { idx }
        });
    }

    async login(member: Member): Promise<Member> {
        const {id, password} = member;

        return await this.findOne({
            select: memberSelectKeys,
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
        const originalMember = await this.select(member);

        console.log(member)

        for(const key of memberUpdateKeys){
            if(member[key] === undefined) continue;
            originalMember[key] = member[key]
        }

        return await this.save(originalMember);
    }

    async duplicateCheck(type, value) {
        return await this.findOne({
            [type]: value
        });
    }

}