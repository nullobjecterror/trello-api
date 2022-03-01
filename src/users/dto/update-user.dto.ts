import { OmitType, PartialType } from '@nestjs/swagger';
import { SignUpUserDto } from './sign-up.dto';

export class UpdateUserDto extends PartialType(
  OmitType(SignUpUserDto, ['email']),
) {}
