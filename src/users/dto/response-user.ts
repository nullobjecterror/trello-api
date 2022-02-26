import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { SignUpUserDto } from './sign-up.dto';

export class ResponseUserDto extends PartialType(
  OmitType(SignUpUserDto, ['password']),
) {
  @ApiProperty()
  id: number;
}
