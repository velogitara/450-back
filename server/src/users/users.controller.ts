import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { User } from './schemas/users.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<User> {
    return this.userService.getOne(id);
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createRecipientDto: CreateUserDto): Promise<User> {
    return this.userService.create(createRecipientDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string): Promise<User> {
    return this.userService.remove(id);
  }
  @Put(':id')
  update(
    @Body() updateRecipientDto: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<User> {
    return this.userService.update(id, updateRecipientDto);
  }
}
