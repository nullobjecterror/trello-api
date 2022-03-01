import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateColumnDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  title: string;
}
