import { ResponseUserDto } from '../../users/dto/response-user';

export class ResponseLoginUserDto {
  user: ResponseUserDto;
  access_token: string;
}
