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
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { EditCommentsGuard } from './edit-comments.guard';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@UserParam() user, @Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(user.userId, createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.commentsService.findOne(id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, EditCommentsGuard)
  @ApiParam({ name: 'id', type: 'number' })
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, EditCommentsGuard)
  @ApiParam({ name: 'id', type: 'number' })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.commentsService.remove(id);
  }
}
