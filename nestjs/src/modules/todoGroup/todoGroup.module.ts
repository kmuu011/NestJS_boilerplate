import {Global, Module} from '@nestjs/common';
import {TodoGroupController} from './todoGroup.controller';
import {TodoGroupService} from './todoGroup.service';
import {TodoModule} from "./todo/todo.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TodoGroupRepository} from "./todoGroup.repository";

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([
            TodoGroupRepository,
        ]),
        TodoModule
    ],
    controllers: [TodoGroupController],
    providers: [TodoGroupService],
    exports: [
        TypeOrmModule.forFeature([
            TodoGroupRepository,
        ]),
        TodoGroupService,
    ]
})

export class TodoGroupModule {}
