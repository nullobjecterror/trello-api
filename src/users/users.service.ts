import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { ColumnEntity } from 'src/columns/entities/column.entity';
import { Comment } from 'src/comments/entities/comment.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findColumns(id: number): Promise<ColumnEntity[]> {
    const user = await this.usersRepository.findOne(id, {
      relations: ['columns'],
    });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user.columns;
  }

  async findComments(id: number): Promise<Comment[]> {
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
    if (!user) {
      throw new NotFoundException(`User with ID=${id} not found`);
    }
    await this.usersRepository.delete(user);
  }

  async create(createUserDto: CreateUserDto) {
    if (await this.usersRepository.findOne({ email: createUserDto.email })) {
      throw new ConflictException('User already exist');
    }
    const user = User.create(createUserDto);
    await user.save();
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.preload({
      id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`User with ID=${id} not found`);
    }
    return this.usersRepository.save(user);
  }

  async findByEmail(email: string) {
    return await User.findOne({
      where: {
        email: email,
      },
    });
  }
}
