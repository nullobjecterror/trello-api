import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import { ColumnsRepository } from './columns.repository';
import { CreateColumnDto } from './dto/create-column.dto';
import { ResponseColumnDto } from './dto/response-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { ColumnEntity } from './entities/column.entity';
@Injectable()
export class ColumnsService {
  constructor(
    private columnsRepository: ColumnsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async create(
    userId: number,
    createColumnDto: CreateColumnDto,
  ): Promise<ResponseColumnDto> {
    const user = await this.usersRepository.findOne(userId);
    const column = ColumnEntity.create({ ...createColumnDto, user });
    return await column.save();
  }

  findAll(): Promise<ResponseColumnDto[]> {
    return this.columnsRepository.find();
  }

  async findOne(id: number) {
    const column = await this.columnsRepository.findOne(id, {
      relations: ['user', 'cards'],
    });
    if (!column) throw new NotFoundException(`Column with ID=${id} not found`);

    return column;
  }

  async update(
    id: number,
    updateColumnDto: UpdateColumnDto,
  ): Promise<ResponseColumnDto> {
    const column = await this.columnsRepository.preload({
      id,
      ...updateColumnDto,
    });
    return await this.columnsRepository.save(column);
  }

  async remove(id: number): Promise<void> {
    await this.columnsRepository.delete(id);
  }
}
