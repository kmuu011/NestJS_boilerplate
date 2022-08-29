import {PickType} from "@nestjs/swagger";
import {Member} from "../../modules/member/entities/member.entity";

export class memberAuthResponse extends PickType(
    Member,
    [
        'idx', 'id', 'nickname', 'email',
        'profile_img_key', 'created_at',
        'auth_type', 'ip', 'user_agent',
        'tokenInfo'
    ] as const
) {}