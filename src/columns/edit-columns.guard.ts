import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ColumnsRepository } from './columns.repository';

@Injectable()
export class EditColumnsGuard implements CanActivate {
  constructor(private columnsRepository: ColumnsRepository) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const column = await this.columnsRepository.findOne(req.params.id);

    if (!column) {
      throw new HttpException(
        ` Column ${req.params.id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    const userId: number = req.user.userId;
    if (column.userId !== userId) {
      throw new ForbiddenException();
    }

    return true;
  }
}
