import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  cardId: number;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  text: string;
}
