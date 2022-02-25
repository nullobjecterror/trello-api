import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { Card } from './entities/card.entity';

@EntityRepository(Card)
export class CardsRepository extends Repository<Card> {}
