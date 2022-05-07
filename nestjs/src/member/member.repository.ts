import {Member} from "./entities/member.entity";
import {Message} from "libs/message";
import {CreateMemberDto} from "./dto/create-member-dto";
import {EntityRepository, Repository} from "typeorm";

@EntityRepository(Member)
export class MemberRepository extends Repository<Member>{

    async signUp(createMemberDto: CreateMemberDto): Promise<Member> {
        const { id, password, nickname, email } = createMemberDto;

        return await this.save({
            id,
            password,
            nickname,
            email
        });
    }

}