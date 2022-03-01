import { Injectable, NotFoundException } from '@nestjs/common';
import { ColumnsRepository } from './columns.repository';
import { CreateColumnDto } from './dto/create-column.dto';
import { ResponseColumnDto } from './dto/response-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { ColumnEntity } from './entities/column.entity';
@Injectable()
export class ColumnsService {
  constructor(private columnsRepository: ColumnsRepository) {}

  async create(
    userId: number,
    createColumnDto: CreateColumnDto,
  ): Promise<ResponseColumnDto> {
    const column = ColumnEntity.create({ ...createColumnDto, userId });
    return await column.save();
  }

  findAll(): Promise<ResponseColumnDto[]> {
    return this.columnsRepository.find();
  }

  async findOne(id: number): Promise<ResponseColumnDto> {
    const column = await this.columnsRepository.findOne(id);
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
