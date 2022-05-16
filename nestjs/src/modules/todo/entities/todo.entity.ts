import {IsNumber, IsString} from "class-validator";

import {
    BaseEntity,
    Column,
    Entity, JoinColumn, ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {TodoGroup} from "./todoGroup.entity";

@Entity({name: 'todo'})
export class Todo extends BaseEntity {
    @IsNumber()
    @PrimaryGeneratedColumn()
    @Column({primary: true, type: "int", unique: true, unsigned: true})
    idx: number = undefined

    @IsString()
    @Column({type: 'varchar', length: 300, comment: '할일 내용'})
    content: string = undefined;


    @ManyToOne(() => TodoGroup, todoGroup => todoGroup.todoList,{
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        nullable: false
    })
    @JoinColumn()
    todoGroup: TodoGroup = undefined;

}