import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from "../../src/app.module";
import {getSavedMember} from "../modules/member/member";
import {Member} from "../../src/modules/member/entities/member.entity";

describe('MemberController (e2e)', () => {
    const savedMemberInfo = getSavedMember();
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AppModule,
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await Promise.all([
            app.close(),
        ])
    })

    describe('/member', () => {
        it('/auth (POST)', async () => {
            const response = await request(app.getHttpServer())
                .post('/member/auth')
                .set('Content-Type', 'application/json; charset=utf-8')
                .set('ip', '127.0.0.1')
                .set('user-agent', 'test-agent')
                .set('token-code', savedMemberInfo.tokenInfo.code)
                .expect(200);

            expect(response.body.id).toBe(savedMemberInfo.id);
        });
    });

});
