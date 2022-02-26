import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CommentsRepository } from './comments.repository';

@Injectable()
export class EditCommentsGuard implements CanActivate {
  constructor(private commentsRepository: CommentsRepository) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const comment = await this.commentsRepository.findOne(req.params.id, {
      relations: ['user'],
    });
    if (!comment) {
      throw new HttpException(
        `Comment with ID=${req.params.id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    const userId: number = req.user.userId;
    if (comment.user.id !== userId) {
      throw new ForbiddenException();
    }

    return true;
  }
}
