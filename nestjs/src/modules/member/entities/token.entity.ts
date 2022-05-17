import {IsNumber, IsString} from "class-validator";

import {
    BaseEntity,
    Column,
    Entity, JoinColumn, OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {Member} from "./member.entity";

@Entity({name: 'member_token'})
export class Token extends BaseEntity {
    @IsNumber()
    @PrimaryGeneratedColumn()
    @Column({primary: true, type: "int", unique: true, unsigned: true})
    idx: number = undefined

    @OneToOne(() => Member, member => member.tokenInfo, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        nullable: false
    })
    @JoinColumn()
    member: Member = undefined;

    @IsString()
    @Column({type: 'varchar', length: 1000, comment: '최근 사용 토큰'})
    token: string = undefined;

    @IsString()
    @Column({type: "varchar", unique: true, length: 50, comment: "유니크 코드"})
    code: string = undefined;

}