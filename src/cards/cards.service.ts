import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnsService } from 'src/columns/columns.service';
import { Repository } from 'typeorm';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardsRepository: Repository<Card>,
    private columnsService: ColumnsService,
  ) {}

  async create(createCardDto: CreateCardDto) {
    const column = await this.columnsService.findOne(createCardDto.columnId);
    const card = Card.create({ ...createCardDto, column });
    await card.save();
    return card;
  }

  findAll(): Promise<Card[]> {
    return this.cardsRepository.find();
  }

  async findOne(id: number): Promise<Card> {
    const card = await this.cardsRepository.findOne(id, {
      relations: ['column', 'comments'],
    });
    if (card) throw new NotFoundException(`Card ${id} not found`);
    return card;
  }

  async update(id: number, updateCardDto: UpdateCardDto) {
    const card = await this.cardsRepository.findOne(id, {
      relations: ['column', 'comments'],
    });
    if (!card) {
      throw new HttpException('Column not found', HttpStatus.NOT_FOUND);
    }
    return this.cardsRepository.update({ id }, updateCardDto);
  }

  async remove(id: number): Promise<void> {
    const card = await this.cardsRepository.findOne(id, {
      relations: ['column', 'comments'],
    });
    if (card) throw new NotFoundException(`Card ${id} not found`);
    await this.cardsRepository.remove(card);
  }
}
