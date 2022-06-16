import {MemberRepository} from "../../../src/modules/member/member.repository";
import {Test, TestingModule} from "@nestjs/testing";
import {getRepositoryToken, TypeOrmModule} from "@nestjs/typeorm";
import {Member} from "../../../src/modules/member/entities/member.entity";
import {typeOrmOptions} from "../../../config/config";
import {savedMemberInfo} from "../member";

describe('Test Spec', () => {
    let memberRepository: MemberRepository;
    let memberInfo: Member;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot(typeOrmOptions),
                TypeOrmModule.forFeature([
                    MemberRepository,
                ])
            ],
            providers: [
                MemberRepository,
                {
                    provide: getRepositoryToken(Member),
                    useValue: MemberRepository
                }
            ]
        }).compile()

        memberRepository = module.get<MemberRepository>(MemberRepository);
        const member: Member = new Member();
        member.dataMigration(savedMemberInfo);
        member.passwordEncrypt();
        memberInfo = await memberRepository.select(member, 'id, password');
    });

    describe('test()', () => {
        it('가입해놓은 멤버가 찍히야함', async () => {

        });
    });


});