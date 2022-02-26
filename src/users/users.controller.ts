import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { SignUpUserDto } from './dto/sign-up.dto';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserParam } from './user.decorator';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthLoginDto } from 'src/auth/dto/sign-in.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @ApiBody({ type: AuthLoginDto })
  @Post('login')
  login(@UserParam() user) {
    return this.authService.login(user);
  }

  @Post('register')
  create(@Body() createUserDto: SignUpUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiParam({ name: 'id', type: 'number' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @ApiParam({ name: 'id', type: 'number' })
  @Get(':id/columns')
  findColumns(@Param('id') id: number) {
    return this.usersService.findColumns(id);
  }

  @ApiParam({ name: 'id', type: 'number' })
  @Get(':id/comments')
  findComments(@Param('id') id: number) {
    return this.usersService.findComments(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@UserParam() user, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(user.userId, updateUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@UserParam() user) {
    return this.usersService.remove(user.userId);
  }
}
