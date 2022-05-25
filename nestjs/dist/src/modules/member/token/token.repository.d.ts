import { Repository } from "typeorm";
import { Token } from "../entities/token.entity";
import { Member } from "../entities/member.entity";
export declare class TokenRepository extends Repository<Token> {
    select(tokenCode: string): Promise<Token>;
    saveToken(member: Member, token: string, code: string): Promise<Token>;
}
