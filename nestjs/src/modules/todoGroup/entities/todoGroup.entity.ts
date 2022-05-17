import {IsDateString, IsNumber, IsString} from "class-validator";
import {Member} from "../../member/entities/member.entity";

import {
    BaseEntity,
    Column,
    Entity, JoinColumn, ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {Todo} from "./todo.entity";

@Entity({name: 'todo_group'})
export class TodoGroup extends BaseEntity {
    @IsNumber()
    @PrimaryGeneratedColumn()
    @Column({primary: true, type: "int", unique: true, unsigned: true})
    idx: number = undefined

    @ManyToOne(() => Member, member => member.todoGroupList, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        nullable: false
    })
    @JoinColumn()
    member: Member = undefined;

    @IsString()
    @Column({type: 'varchar', length: 100, comment: '할일 그룹 제목'})
    title: string = undefined;

    @OneToMany(() => Todo, todo => todo.todoGroup, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    @JoinColumn()
    todoList: Todo[] = undefined;

    @IsNumber()
    @Column({type: "tinyint", comment: "순서"})
    order: number = undefined;

    @IsDateString()
    @Column({type: "timestamp", default: () => "now", comment: "생성 일자"})
    created_at: string = undefined;

    @IsDateString()
    @Column({type: "timestamp", default: () => "now", comment: "수정 일자"})
    updated_at: string = undefined;

    dataMigration(object): void {
        for (let k in new TodoGroup()) {
            if (object[k] === undefined) continue;
            this[k] = object[k];
        }
    }

}