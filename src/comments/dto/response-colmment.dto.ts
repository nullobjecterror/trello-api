import { PartialType } from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';

export class ResponseCommentDto extends PartialType(CreateCommentDto) {
  id: number;
}
