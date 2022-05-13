import {EntityRepository, Repository} from "typeorm";
import {Token} from "./entities/token.entity";
import {Member} from "./entities/member.entity";

@EntityRepository(Token)
export class TokenRepository extends Repository<Token> {

    async select(tokenCode: string) {
        return await this.findOne({
            relations: ["member"],
            where:{code: tokenCode},
        })
    }

    async saveToken(member: Member, token: string, code: string) {
        const tokenInfo = await this.findOne({
            where: {member: member.idx}
        });

        tokenInfo.token = token;
        tokenInfo.code = code;

        return await this.save(tokenInfo);
    }


}