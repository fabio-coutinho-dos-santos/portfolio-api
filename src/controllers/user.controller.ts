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
import { UserService } from '../use-cases/user/user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/use-cases/auth/role/role.guard';
import { CreateUserDto } from 'src/core/dtos/users/create-user.dto';
import { UpdateUserDto } from 'src/core/dtos/users/update-user.dto';
import { Role } from 'src/use-cases/auth/role/role.decorator';
import { roles } from 'src/use-cases/auth/role/roles';

@ApiTags(`Users`)
@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Role(roles.ADMIN)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
