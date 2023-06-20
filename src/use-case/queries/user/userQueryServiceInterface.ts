import {
  FindByEmailInputDto,
  FindByEmailOutputDto,
} from '@/use-case/queries/user/dto/findByEmailDto';
import {
  FindByIdInputDto,
  FindByIdOutputDto,
} from '@/use-case/queries/user/dto/findByIdDto';

export const USER_QUERY_SERVICE_PROVIDER = 'USER_QUERY_SERVICE_PROVIDER';

export interface IUserQueryService {
  /** Emailからユーザーを取得する */
  findByEmail(input: FindByEmailInputDto): Promise<FindByEmailOutputDto>;

  /** idからユーザーを取得する */
  findById(input: FindByIdInputDto): Promise<FindByIdOutputDto>;
}
