import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CardsService } from './cards.service';

@Injectable()
export class EditCardsGuard implements CanActivate {
  constructor(private cardService: CardsService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const card = await this.cardService.findOne(req.params.id);
    const userId: number = req.user.userId;
    if (card.column.user.id !== userId) {
      throw new ForbiddenException();
    }

    return true;
  }
}
