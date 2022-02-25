import {
  IsDefined,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthLoginDto {
  @IsDefined()
  @IsEmail()
  email: string;

  @IsString()
  @IsDefined()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}
