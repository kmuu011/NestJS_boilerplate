import {IsBoolean, IsEmail, IsNumber, IsString, Length, NotContains} from "class-validator";
import config from "config/config";
import cipher from "libs/cipher";
import {Message} from "libs/message";

import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';

const jwt = require('jsonwebtoken');

const crypto = require('crypto');

const expireTime = config.member.expireTime;
const jwtSecret = config.member.jwtSecret;

@Entity({ name: 'member' })
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
    @Column({ type: 'varchar', length: 20, unique: true, comment: '유저 아이디' })
    id: string = undefined;

    @IsString()
    @Column({ type: 'varchar', length: 200, comment: '유저 비밀번호' })
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
    @Column({ type: 'varchar', length: 20, comment: '유저 닉네임' })
    nickname: string = undefined;

    @NotContains('어드민')
    @NotContains('admin')
    @NotContains('테스트')
    @NotContains('test')
    @NotContains('관리자')
    @IsEmail()
    @Column({ type: 'varchar', length: 150, unique: true, comment: '유저 이메일' })
    email: string = undefined;

    @IsString()
    @Column({ type: 'varchar', length: 200, nullable: true, comment: '유저 프로필 이미지 키' })
    profile_img_key: string = undefined;

    @IsNumber()
    @Column({ type: 'tinyint', default: 0, unsigned: true,comment: '관리자 유무' })
    admin: number = undefined;

    @IsNumber()
    @Column({ type: 'timestamp', default: "CURRENT_TIMESTAMP()", comment: '회원가입 일자' })
    created_at: number = undefined;
    
    @IsNumber()
    @Column({ type: 'timestamp', default: "CURRENT_TIMESTAMP()", comment: '수정 일자' })
    updated_at: number = undefined;

    @IsNumber()
    @Column({ type: 'tinyint', default: 0, comment: '가입 유형' })
    auth_type: number = undefined;

    @IsString()
    @Column({ type: 'varchar', length: 100, nullable: true, comment: '소셜 가입 유니크 키' })
    auth_id: string = undefined;

    @IsString()
    @Column({ type: 'varchar', length: 30, nullable: true, comment: '접속 IP' })
    ip: string = undefined;

    @IsString()
    @Column({ type: 'varchar', length: 400, nullable: true, comment: '접속 환경' })
    user_agent: string = undefined;

    @IsString()
    @Column({ type: 'varchar', length: 300, nullable: true, comment: '최근 사용 토큰' })
    token: string = undefined;

    @IsBoolean()
    keep_check: boolean = undefined;

    passwordEncrypt(): void{
        if(this.password_encrypted !== true) {
            this.password = crypto
                .createHash(config.member.hashAlgorithm)
                .update(this.password + config.member.salt)
                .digest('hex');
        }
    }

    getPayload(): object{
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

    createToken(): void {
        const payloadObj = this.getPayload();

        const token = jwt.sign(payloadObj, jwtSecret, {expiresIn: expireTime});

        this.token = cipher.encrypt(token);
    }

    async decodeToken(): Promise<void> {
        const authorization = await new Promise(async (resolve) => {
            const token = cipher.decrypt(this.token);
            if(token === undefined) resolve(undefined);

            jwt.verify(token, jwtSecret, (err, decoded) => {
                if(err){
                    resolve(undefined);
                }
                resolve(decoded);
            });
        });

        if(authorization === undefined){
            throw Message.UNAUTHORIZED;
        }

        this.dataMigration(authorization);
    }

    dataMigration(object): void {
        for(let k in new Member()){
            if(object[k] === undefined) continue;
            this[k] = object[k];
        }
    }
}