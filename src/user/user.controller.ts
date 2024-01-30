import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';

import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/enums/auth.enums';
import { ROLES } from 'src/auth/decorators/roles.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  @UseGuards(AccessTokenGuard, RolesGuard)
  @ROLES(Role.Admin)
  findAll() {
    return this.userService.findUsers();
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(+id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(+id, updateUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.removeUser(+id);
  }
}
