import { Member } from "../entities/member.entity";
declare const UpdateMemberDto_base: import("@nestjs/mapped-types").MappedType<Pick<Member, "nickname" | "email">>;
export declare class UpdateMemberDto extends UpdateMemberDto_base {
    password: string;
    originalPassword: string;
}
export {};
