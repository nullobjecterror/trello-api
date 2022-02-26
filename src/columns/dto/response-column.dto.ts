import { PartialType } from '@nestjs/swagger';
import { CreateColumnDto } from './create-column.dto';

export class ResponseColumnDto extends PartialType(CreateColumnDto) {
  id: number;
}
