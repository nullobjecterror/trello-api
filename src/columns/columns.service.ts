import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import { ColumnsRepository } from './columns.repository';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { ColumnEntity } from './entities/column.entity';
@Injectable()
export class ColumnsService {
  constructor(
    private columnsRepository: ColumnsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async create(userId: number, createColumnDto: CreateColumnDto) {
    const user = await this.usersRepository.findOne(userId);
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

  async update(id: number, updateColumnDto: UpdateColumnDto): Promise<void> {
    const column = await this.columnsRepository.findOne({
      where: { id },
    });
    if (!column) {
      throw new HttpException('Column not found', HttpStatus.NOT_FOUND);
    }
    await this.columnsRepository.update({ id }, updateColumnDto);
  }

  async remove(id: number): Promise<void> {
    const column = await this.columnsRepository.findOne({
      where: { id },
    });
    if (!column) {
      throw new HttpException('Column not found', HttpStatus.NOT_FOUND);
    }
    await this.columnsRepository.remove(column);
  }
}
