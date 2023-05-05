import {
  RESPONSE_STATUS_DESCRIPTION,
  ResponseStatusDescription,
} from '@/common/constants/response.status.description';
import { HttpException, HttpStatus } from '@nestjs/common';

type CreateResponse<T> = {
  timeStamp: string;
  statusCode: HttpStatus;
  message: ResponseStatusDescription;
  data: T;
};

/**
 * statusCodeによって、返却するメッセージを作成します
 * @param statusCode
 * @returns
 */
const createMessage = (statusCode: HttpStatus): ResponseStatusDescription => {
  if (statusCode === HttpStatus.OK) return RESPONSE_STATUS_DESCRIPTION.OK;
  if (statusCode === HttpStatus.CREATED)
    return RESPONSE_STATUS_DESCRIPTION.CREATED;

  throw new HttpException('不正な操作です', HttpStatus.BAD_REQUEST);
};

/**
 * 共通のレスポンスを作成します
 * @param statusCode
 * @param data
 * @returns
 */
export const createResponse = <T>(
  statusCode: HttpStatus,
  data: T,
): CreateResponse<T> => {
  return {
    timeStamp: new Date().toISOString(),
    statusCode: statusCode,
    message: createMessage(statusCode),
    data,
  };
};
