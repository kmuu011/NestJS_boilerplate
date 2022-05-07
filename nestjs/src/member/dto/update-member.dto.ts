import {PartialType} from "@nestjs/mapped-types";
import {Member} from "../entities/member.entity";

export class UpdateMemberDto extends PartialType(Member) {}