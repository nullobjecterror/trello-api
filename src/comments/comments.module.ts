import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsRepository } from 'src/cards/cards.repository';
import { UsersRepository } from 'src/users/users.repository';
import { CommentsRepository } from './comments.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentsRepository,
      UsersRepository,
      CardsRepository,
    ]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
