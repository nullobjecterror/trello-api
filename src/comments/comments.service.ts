import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { CommentsRepository } from './comments.repository';
import { CardsRepository } from 'src/cards/cards.repository';
import { ResponseCommentDto } from './dto/response-colmment.dto';

@Injectable()
export class CommentsService {
  constructor(
    private commentsRepository: CommentsRepository,
    private usersRepository: UsersRepository,
    private cardsRepository: CardsRepository,
  ) {}

  async create(
    userId: number,
    createCommentDto: CreateCommentDto,
  ): Promise<ResponseCommentDto> {
    const comment = Comment.create({ ...createCommentDto, userId });
    return comment.save();
  }

  findAll(): Promise<ResponseCommentDto[]> {
    return this.commentsRepository.find();
  }

  async findOne(id: number): Promise<Comment> {
    const comment = await this.commentsRepository.findOne(id);
    if (!comment)
      throw new NotFoundException(`Comment with ID=${id} not found`);
    return comment;
  }

  async update(
    id: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<ResponseCommentDto> {
    return this.commentsRepository.save({ id, ...updateCommentDto });
  }

  async remove(id: number): Promise<void> {
    await this.commentsRepository.delete(id);
  }
}
