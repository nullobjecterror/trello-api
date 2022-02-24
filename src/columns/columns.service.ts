import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { ColumnEntity } from './entities/column.entity';
@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(ColumnEntity)
    private columnsRepository: Repository<ColumnEntity>,
    private userService: UsersService,
  ) {}

  async create(userId: number, createColumnDto: CreateColumnDto) {
    const user = await this.userService.findOne(userId);
    const column = ColumnEntity.create({ ...createColumnDto, user });
    await column.save();
    return column;
  }

  findAll(): Promise<ColumnEntity[]> {
    return this.columnsRepository.find();
  }

  async findOne(id: number): Promise<ColumnEntity> {
    const column = await this.columnsRepository.findOne(id, {
      relations: ['user', 'cards'],
    });
    if (!column) throw new NotFoundException(`Column with ID=${id} not found`);

    return column;
  }

  async update(id: number, updateColumnDto: UpdateColumnDto) {
    const column = await this.columnsRepository.findOne({
      where: { id },
      relations: ['user', 'cards'],
    });
    if (!column) {
      throw new HttpException('Column not found', HttpStatus.NOT_FOUND);
    }
    return this.columnsRepository.update({ id }, updateColumnDto);
  }

  async remove(id: number): Promise<void> {
    const column = await this.columnsRepository.findOne({
      where: { id },
      relations: ['user', 'cards'],
    });
    if (!column) {
      throw new HttpException('Column not found', HttpStatus.NOT_FOUND);
    }
    await this.columnsRepository.remove(column);
  }
}
