import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  cardId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  text: string;
}
