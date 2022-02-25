import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnsRepository } from 'src/columns/columns.repository';
import { CardsRepository } from './cards.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CardsRepository, ColumnsRepository])],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
