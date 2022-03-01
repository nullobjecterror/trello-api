import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateCardDto {
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  columnId: number;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @MaxLength(256)
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @MaxLength(5120)
  description: string;
}
