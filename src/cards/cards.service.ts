import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ColumnsRepository } from 'src/columns/columns.repository';
import { CardsRepository } from './cards.repository';
import { CreateCardDto } from './dto/create-card.dto';
import { ResponseCardDto } from './dto/response-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';

@Injectable()
export class CardsService {
  constructor(
    private cardsRepository: CardsRepository,
    private columnsRepository: ColumnsRepository,
  ) {}

  async create(createCardDto: CreateCardDto): Promise<ResponseCardDto> {
    const column = await this.columnsRepository.findOne(createCardDto.columnId);
    const card = Card.create({ ...createCardDto, column });
    return await card.save();
  }

  findAll(): Promise<ResponseCardDto[]> {
    return this.cardsRepository.find();
  }

  async findOne(id: number): Promise<Card> {
    const card = await this.cardsRepository.findOne(id, {
      relations: ['column', 'comments'],
    });
    if (!card) throw new NotFoundException(`Card ${id} not found`);
    return card;
  }

  async update(
    id: number,
    updateCardDto: UpdateCardDto,
  ): Promise<ResponseCardDto> {
    const card = await this.cardsRepository.preload({
      id,
      ...updateCardDto,
    });
    return await this.cardsRepository.save(card);
  }

  async remove(id: number): Promise<void> {
    await this.cardsRepository.delete(id);
  }
}
