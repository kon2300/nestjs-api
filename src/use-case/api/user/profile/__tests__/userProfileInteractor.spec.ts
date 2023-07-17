import { Test, TestingModule } from '@nestjs/testing';
import { AdaptorCqrsModule } from '@/adaptor/secondary/cqrs/adaptorCqrsModule';
import {
  IUserQuery,
  USER_QUERY_PROVIDER,
} from '@/use-case/queries/user/userQueryInterface';
import {
  testDataForUser,
  testDataForUserProfileInput,
  testDataForUserProfileOutput,
} from '@/use-case/api/user/profile/__tests__/test-data/userProfileTestData';
import {
  IS3Service,
  S3_SERVICE_PROVIDER,
} from '@/use-case/file-storage/s3ServiceInterface';
import { AdaptorFileStorageModule } from '@/adaptor/primary/file-storage/adaptorFileStorageModule';
import {
  IUserProfileUseCase,
  USER_PROFILE_USE_CASE_PROVIDER,
} from '@/use-case/api/user/profile/userProfileUseCase';
import { UserProfileUseCaseProvider } from '@/use-case/api/user/profile/userProfileInteractor';

describe('userProfileInteractorのテスト', () => {
  let userProfileInteractor: IUserProfileUseCase;
  let userQuery: IUserQuery;
  let s3Service: IS3Service;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AdaptorCqrsModule, AdaptorFileStorageModule],
      providers: [UserProfileUseCaseProvider],
    }).compile();

    userProfileInteractor = moduleFixture.get<IUserProfileUseCase>(
      USER_PROFILE_USE_CASE_PROVIDER,
    );
    userQuery = moduleFixture.get<IUserQuery>(USER_QUERY_PROVIDER);
    s3Service = moduleFixture.get<IS3Service>(S3_SERVICE_PROVIDER);
  });

  describe('run', () => {
    describe('正常系', () => {
      it('ユーザ情報が取得できること', async () => {
        jest.spyOn(userQuery, 'findById').mockResolvedValue(testDataForUser);
        jest
          .spyOn(s3Service, 'getFile')
          .mockResolvedValue({ file: 'testFile' });

        const output = await userProfileInteractor.run(
          testDataForUserProfileInput,
        );

        expect(output).toStrictEqual(testDataForUserProfileOutput);
      });
    });
  });
});
