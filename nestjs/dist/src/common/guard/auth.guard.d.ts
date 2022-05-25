import { CanActivate, ExecutionContext } from '@nestjs/common';
import { TokenRepository } from "../../modules/member/token/token.repository";
export declare class AuthGuard implements CanActivate {
    private tokenRepository;
    constructor(tokenRepository: TokenRepository);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
