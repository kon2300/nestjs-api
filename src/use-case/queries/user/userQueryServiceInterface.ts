import {
  FindByEmailInputDto,
  FindByEmailOutputDto,
} from '@/use-case/queries/user/dto/findByEmailDto';

export const USER_QUERY_SERVICE_PROVIDER = 'USER_QUERY_SERVICE_PROVIDER';

export interface IUserQueryService {
  /** Emailからユーザーを取得する */
  findByEmail(input: FindByEmailInputDto): Promise<FindByEmailOutputDto>;
}
