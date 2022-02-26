import { PartialType } from '@nestjs/swagger';
import { CreateCardDto } from './create-card.dto';

export class ResponseCardDto extends PartialType(CreateCardDto) {
  id: number;
}
