import { Injectable, NotFoundException } from '@nestjs/common';
import { CardsRepository } from './cards.repository';
import { CreateCardDto } from './dto/create-card.dto';
import { ResponseCardDto } from './dto/response-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';

@Injectable()
export class CardsService {
  constructor(private cardsRepository: CardsRepository) {}

  async create(createCardDto: CreateCardDto): Promise<ResponseCardDto> {
    const card = Card.create(createCardDto);
    return card.save();
  }

  findAll(): Promise<ResponseCardDto[]> {
    return this.cardsRepository.find();
  }

  async findOne(id: number): Promise<ResponseCardDto> {
    const card = await this.cardsRepository.findOne(id);
    if (!card) throw new NotFoundException(`Card ${id} not found`);
    return card;
  }

  async update(
    id: number,
    updateCardDto: UpdateCardDto,
  ): Promise<ResponseCardDto> {
    const card = await this.cardsRepository.findOne(id, { select: ['id'] });

    if (!card) throw new NotFoundException(`Card ${id} not found`);

    return this.cardsRepository.save({
      ...card,
      ...updateCardDto,
    });
  }

  async remove(id: number): Promise<void> {
    await this.cardsRepository.delete(id);
  }
}
