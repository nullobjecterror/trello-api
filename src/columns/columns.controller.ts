import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserParam } from 'src/users/user.decorator';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { EditColumnsGuard } from './edit-columns.guard';

@ApiTags('columns')
@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@UserParam() user, @Body() createColumnDto: CreateColumnDto) {
    return this.columnsService.create(user.userId, createColumnDto);
  }

  @Get()
  findAll() {
    return this.columnsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.columnsService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, EditColumnsGuard)
  @ApiParam({ name: 'id', type: 'number' })
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateColumnDto: UpdateColumnDto) {
    return this.columnsService.update(id, updateColumnDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, EditColumnsGuard)
  @ApiParam({ name: 'id', type: 'number' })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.columnsService.remove(id);
  }
}
