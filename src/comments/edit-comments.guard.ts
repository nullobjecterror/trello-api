import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CommentsService } from './comments.service';

@Injectable()
export class EditCommentsGuard implements CanActivate {
  constructor(private commentsService: CommentsService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const comment = await this.commentsService.findOne(req.params.id);
    const userId: number = req.user.userId;
    if (comment.user.id !== userId) {
      throw new ForbiddenException();
    }

    return true;
  }
}
