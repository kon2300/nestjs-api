import {
  FindByEmailInputDto,
  FindByEmailOutputDto,
} from '@/usecase/queries/user/find.unique.dto';

export const USER_QUERY_SERVICE_PROVIDER = 'USER_QUERY_SERVICE_PROVIDER';

export interface IUserQueryService {
  findByEmail(input: FindByEmailInputDto): Promise<FindByEmailOutputDto>;
}
