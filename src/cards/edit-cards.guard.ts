import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ColumnsRepository } from 'src/columns/columns.repository';
import { CardsRepository } from './cards.repository';

@Injectable()
export class EditCardsGuard implements CanActivate {
  constructor(
    private cardsRepository: CardsRepository,
    private columnsRepository: ColumnsRepository,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    const card = await this.cardsRepository.findOne(req.params.id, {
      relations: ['column'],
    });
    if (!card) {
      throw new HttpException(
        `Card ${req.params.id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    const column = await this.columnsRepository.findOne(card.column.id);

    const userId: number = req.user.userId;
    if (column.userId !== userId) {
      throw new ForbiddenException();
    }

    return true;
  }
}
