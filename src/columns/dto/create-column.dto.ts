import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateColumnDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;
}
