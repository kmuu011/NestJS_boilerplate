import { Member } from "../entities/member.entity";
declare const CreateMemberDto_base: import("@nestjs/mapped-types").MappedType<Pick<Member, "password" | "id" | "nickname" | "email">>;
export declare class CreateMemberDto extends CreateMemberDto_base {
}
export {};
