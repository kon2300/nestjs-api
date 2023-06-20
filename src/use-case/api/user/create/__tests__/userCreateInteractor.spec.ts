import { Test, TestingModule } from '@nestjs/testing';
import { UserCreateUseCaseProvider } from '@/use-case/api/user/create/userCreateInteractor';
import { AdaptorCqrsModule } from '@/adaptor/secondary/cqrs/adaptorCqrsModule';
import {
  IUserCreateUseCase,
  USER_CREATE_USE_CASE_PROVIDER,
} from '@/use-case/api/user/create/userCreateUseCase';
import {
  IUserQueryService,
  USER_QUERY_SERVICE_PROVIDER,
} from '@/use-case/queries/user/userQueryServiceInterface';
import {
  IUserRepository,
  USER_REPOSITORY_PROVIDER,
} from '@/domain/user/userRepositoryInterface';
import {
  testDataForUserCreateInput,
  testDataForUser,
  testFileDataForUser,
} from '@/use-case/api/user/create/__tests__/test-data/userCreateTestData';
import {
  IS3Service,
  S3_SERVICE_PROVIDER,
} from '@/use-case/file-storage/s3ServiceInterface';
import { AdaptorFileStorageModule } from '@/adaptor/primary/file-storage/adaptorFileStorageModule';

describe('userCreateInteractorのテスト', () => {
  let userCreateInteractor: IUserCreateUseCase;
  let userQueryService: IUserQueryService;
  let userRepository: IUserRepository;
  let s3Service: IS3Service;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AdaptorCqrsModule, AdaptorFileStorageModule],
      providers: [UserCreateUseCaseProvider],
    }).compile();

    userCreateInteractor = moduleFixture.get<IUserCreateUseCase>(
      USER_CREATE_USE_CASE_PROVIDER,
    );
    userQueryService = moduleFixture.get<IUserQueryService>(
      USER_QUERY_SERVICE_PROVIDER,
    );
    userRepository = moduleFixture.get<IUserRepository>(
      USER_REPOSITORY_PROVIDER,
    );
    s3Service = moduleFixture.get<IS3Service>(S3_SERVICE_PROVIDER);
  });

  describe('run', () => {
    describe('正常系', () => {
      it('同じemailのユーザーがいなければ登録できること', async () => {
        jest.spyOn(userQueryService, 'findByEmail').mockResolvedValue(null);
        jest.spyOn(userRepository, 'save').mockResolvedValue();
        jest
          .spyOn(s3Service, 'uploadFile')
          .mockResolvedValue({ filePath: 'testFilePath' });

        const output = await userCreateInteractor.run(
          testDataForUserCreateInput,
          testFileDataForUser,
        );

        expect(output).toBeUndefined();
      });
    });

    describe('異常系', () => {
      it('同じemailのユーザーがいた場合、登録できないこと', async () => {
        jest
          .spyOn(userQueryService, 'findByEmail')
          .mockResolvedValue(testDataForUser);

        expect(
          userCreateInteractor.run(
            testDataForUserCreateInput,
            testFileDataForUser,
          ),
        ).rejects.toThrow('すでに登録済みのユーザーです');
      });
    });
  });
});
