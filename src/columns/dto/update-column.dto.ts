import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateColumnDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;
}
