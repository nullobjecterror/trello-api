import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { CommentsRepository } from './comments.repository';
import { CardsRepository } from 'src/cards/cards.repository';

@Injectable()
export class CommentsService {
  constructor(
    private commentsRepository: CommentsRepository,
    private usersRepository: UsersRepository,
    private cardsRepository: CardsRepository,
  ) {}

  async create(userId: number, createCommentDto: CreateCommentDto) {
    const user = await this.usersRepository.findOne(userId);
    const card = await this.cardsRepository.findOne(createCommentDto.cardId);
    const comment = Comment.create({ ...createCommentDto, user, card });
    await comment.save();
    return comment;
  }

  findAll(): Promise<Comment[]> {
    return this.commentsRepository.find({ relations: ['card', 'user'] });
  }

  async findOne(id: number): Promise<Comment> {
    const comment = await this.commentsRepository.findOne(id, {
      relations: ['card', 'user'],
    });
    if (!comment)
      throw new NotFoundException('Comment with ID=${id} not found');
    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentsRepository.preload({
      id,
      ...updateCommentDto,
    });
    if (!comment) {
      throw new NotFoundException(`Comment with ID=${id} not found`);
    }
    return this.commentsRepository.save(comment);
  }

  async remove(id: number): Promise<void> {
    const comment = await this.commentsRepository.findOne(id);
    if (!comment) {
      throw new NotFoundException(`Comment with ID=${id} not found`);
    }
    await this.commentsRepository.delete(id);
  }
}
