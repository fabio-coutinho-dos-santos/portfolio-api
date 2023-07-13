import {
  Body,
  Controller,
  Injectable,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { LoginAuthDto } from 'src/core/dtos/auth/login-auth.dto';
import { AuthService } from 'src/use-cases/auth/auth.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: any, @Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(req.user);
  }
}