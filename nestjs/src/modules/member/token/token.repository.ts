import {EntityRepository, Repository} from "typeorm";
import {Token} from "../entities/token.entity";
import {Member} from "../entities/member.entity";

@EntityRepository(Token)
export class TokenRepository extends Repository<Token> {

    async select(tokenCode: string): Promise<Token> {
        return await this.findOne({
            relations: ["member"],
            where:{code: tokenCode},
        })
    }

    async saveToken(member: Member, token: string, code: string): Promise<Token> {
        const tokenInfo: Token = (await this.findOne({
            where: {member: member.idx}
        })) || new Token();

        tokenInfo.token = token;
        tokenInfo.code = code;
        tokenInfo.member = member;

        return await this.save(tokenInfo);
    }


}