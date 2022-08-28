import {IsDateString, IsNumber, IsString} from "class-validator";

import {
    BaseEntity,
    Column,
    Entity, JoinColumn, ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {TodoGroup} from "../../entities/todoGroup.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity({name: 'todo'})
export class Todo extends BaseEntity {
    @IsNumber()
    @PrimaryGeneratedColumn()
    @Column({primary: true, type: "int", unique: true, unsigned: true})
    idx: number = undefined

    @ManyToOne(() => TodoGroup, todoGroup => todoGroup.todoList, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        nullable: false
    })
    @JoinColumn()
    todoGroup: TodoGroup = undefined;

    @IsString()
    @Column({type: 'varchar', length: 300, comment: '할일 내용'})
    @ApiProperty()
    content: string = undefined;

    @IsDateString()
    @Column({type: "timestamp", default: () => "now", comment: "생성 일자"})
    created_at: string = undefined;

    @IsDateString()
    @Column({type: "timestamp", default: () => "now", comment: "수정 일자"})
    updated_at: string = undefined;

    @IsDateString()
    @Column({type: "timestamp", nullable: true, comment: "완료 일자"})
    completed_at: string = undefined;

    dataMigration(object: object): void {
        for (let k in new Todo()) {
            if (object[k] === undefined) continue;
            this[k] = object[k];
        }
    }
}