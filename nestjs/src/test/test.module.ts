import {Module} from '@nestjs/common';
import {TestController} from './test.controller';
import {Member} from "../member/entities/member.entity";

import {TypeOrmModule} from "@nestjs/typeorm";
import {TestRepository} from "./test.repository";

@Module({
    imports: [TypeOrmModule.forFeature([TestRepository])],
    controllers: [TestController],
    providers: [Member],
})

export class TestModule {}
