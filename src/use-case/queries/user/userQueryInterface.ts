import {
  FindByEmailInputDto,
  FindByEmailOutputDto,
} from '@/use-case/queries/user/dto/findByEmailDto';
import {
  FindByIdInputDto,
  FindByIdOutputDto,
} from '@/use-case/queries/user/dto/findByIdDto';

export const USER_QUERY_PROVIDER = 'USER_QUERY_PROVIDER';

export interface IUserQuery {
  /** Emailからユーザーを取得する */
  findByEmail(input: FindByEmailInputDto): Promise<FindByEmailOutputDto>;

  /** idからユーザーを取得する */
  findById(input: FindByIdInputDto): Promise<FindByIdOutputDto>;
}
