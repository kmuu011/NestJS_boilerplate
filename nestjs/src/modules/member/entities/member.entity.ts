import {IsBoolean, IsEmail, IsNumber, IsString, Length, NotContains} from "class-validator";
import {Token} from "./token.entity";

import {
    BaseEntity,
    Column, CreateDateColumn,
    Entity, OneToMany, OneToOne,
    PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import {JwtPayload} from "jsonwebtoken";
import {createToken, decodeToken, encryptPassword} from "../../../../libs/member";
import {TodoGroup} from "../../todoGroup/entities/todoGroup.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity({name: 'member'})
export class Member extends BaseEntity {
    @IsNumber()
    @PrimaryGeneratedColumn()
    @Column({primary: true, type: "int", unique: true, unsigned: true})
    idx: number = undefined;

    @NotContains('어드민')
    @NotContains('admin')
    @NotContains('테스트')
    @NotContains('test')
    @NotContains('관리자')
    @Length(3, 15)
    @IsString()
    @Column({type: 'varchar', length: 20, unique: true, comment: '유저 아이디'})
    @ApiProperty({
        example: 'tts'
    })
    id: string = undefined;

    @IsString()
    @Column({type: 'varchar', length: 200, comment: '유저 비밀번호'})
    @ApiProperty({
        example: 'tts0000'
    })
    password: string = undefined;

    @IsBoolean()
    password_encrypted: boolean = undefined;

    @NotContains('어드민')
    @NotContains('admin')
    @NotContains('테스트')
    @NotContains('test')
    @NotContains('관리자')
    @Length(2, 20)
    @IsString()
    @Column({type: 'varchar', length: 20, comment: '유저 닉네임'})
    @ApiProperty({
        example: 'tts'
    })
    nickname: string = undefined;

    @NotContains('어드민')
    @NotContains('admin')
    @NotContains('테스트')
    @NotContains('test')
    @NotContains('관리자')
    @IsEmail()
    @Column({type: 'varchar', length: 150, unique: true, comment: '유저 이메일'})
    @ApiProperty({
        example: 'tts@email.com'
    })
    email: string = undefined;

    @IsString()
    @Column({type: 'varchar', length: 200, nullable: true, comment: '유저 프로필 이미지 키'})
    profile_img_key: string = undefined;

    @IsNumber()
    @Column({type: 'tinyint', default: 0, unsigned: true, comment: '관리자 유무'})
    admin: number = undefined;

    @CreateDateColumn()
    @Column({type: 'datetime', default: () => "now", comment: '회원가입 일자'})
    created_at: string = undefined;

    @UpdateDateColumn()
    @Column({type: 'datetime', default: () => "now", comment: '수정 일자'})
    updated_at: string = undefined;

    @IsNumber()
    @Column({type: 'tinyint', default: 0, comment: '가입 유형'})
    auth_type: number = undefined;

    @IsString()
    @Column({type: 'varchar', length: 100, nullable: true, comment: '소셜 가입 유니크 키'})
    auth_id: string = undefined;

    @IsString()
    @Column({type: 'varchar', length: 30, nullable: true, comment: '접속 IP'})
    ip: string = undefined;

    @IsString()
    @Column({type: 'varchar', length: 400, nullable: true, comment: '접속 환경'})
    user_agent: string = undefined;

    @IsBoolean()
    @ApiProperty()
    keep_check: boolean = undefined;

    @OneToOne(() => Token, token => token.member)
    tokenInfo: Token;

    @OneToMany(() => TodoGroup, todoGroup => todoGroup.member)
    todoGroupList: TodoGroup[];

    passwordEncrypt(): void {
        if (this.password_encrypted !== true) {
            this.password = encryptPassword(this.password)
            this.password_encrypted = true;
        }
    }

    getPayload(): object {
        return {
            idx: this.idx,
            id: this.id,
            nickname: this.nickname,
            ip: this.ip,
            user_agent: this.user_agent,
            keep_check: this.keep_check,
            created_at: this.created_at,
            time: Date.now()
        }
    }

    createToken(): string {
        return createToken(this.getPayload());
    }

    async decodeToken(): Promise<JwtPayload> {
        return decodeToken(this.tokenInfo.token);
    }

    dataMigration(object: object) : void {
        for (let k in new Member()) {
            if (object[k] === undefined) continue;
            this[k] = object[k];
        }
    }
}