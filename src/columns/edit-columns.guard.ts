import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ColumnsService } from './columns.service';

@Injectable()
export class EditColumnsGuard implements CanActivate {
  constructor(private columnService: ColumnsService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const column = await this.columnService.findOne(req.params.id);
    const userId: number = req.user.userId;
    if (column.user.id !== userId) {
      throw new ForbiddenException();
    }

    return true;
  }
}
