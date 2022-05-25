import { Member } from "../entities/member.entity";
declare const LoginMemberDto_base: import("@nestjs/mapped-types").MappedType<Pick<Member, "password" | "id" | "keep_check">>;
export declare class LoginMemberDto extends LoginMemberDto_base {
}
export {};
