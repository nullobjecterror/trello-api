import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { User } from './entities/user.entity';
import { SignUpUserDto } from './dto/sign-up.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ColumnEntity } from 'src/columns/entities/column.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { UsersRepository } from './users.repository';
import { ResponseUserDto } from './dto/response-user';
import { ResponseColumnDto } from 'src/columns/dto/response-column.dto';
import { ResponseCommentDto } from 'src/comments/dto/response-colmment.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  findAll(): Promise<ResponseUserDto[]> {
    return this.usersRepository.find();
  }

  async findColumns(id: number): Promise<ResponseColumnDto[]> {
    const user = await this.usersRepository.findOne(id, {
      relations: ['columns'],
    });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user.columns;
  }

  async findComments(id: number): Promise<ResponseCommentDto[]> {
    const user = await this.usersRepository.findOne(id, {
      relations: ['comments'],
    });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user.comments;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne(id, {
      relations: ['columns', 'comments'],
    });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }

  async remove(id: number): Promise<void> {
    const user = await this.usersRepository.findOne(id);
    await this.usersRepository.delete(user);
  }

  async create(createUserDto: SignUpUserDto): Promise<ResponseUserDto> {
    if (await this.usersRepository.findOne({ email: createUserDto.email })) {
      throw new ConflictException('User already exist');
    }
    const user = User.create(createUserDto);
    return await user.save();
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    const user = await this.usersRepository.preload({
      id,
      ...updateUserDto,
    });
    return await this.usersRepository.save(user);
  }
}
