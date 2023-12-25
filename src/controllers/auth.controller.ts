import {
  Body,
  Controller,
  Inject,
  Injectable,
  Ip,
  Logger,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginAuthDto } from 'src/core/dtos/auth/login-auth.dto';
import AwsNotificationService from 'src/frameworks/notification/aws-sns/aws.notification.service';
import { AuthService } from 'src/use-cases/auth/auth.service';

@ApiTags('Authentication')
@Controller('api/v1/auth')
export class AuthController {
  constructor(
    @Inject('NotificationServiceInterface')
    private readonly notificationService: AwsNotificationService,
    private readonly authService: AuthService
  ) { }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Req() req: any,
    @Body() loginAuthDto: LoginAuthDto,
    @Ip() ip
  ) {
    try {
      this.notificationService.notify(`Access from IP: ${ip}`, process.env.AWS_SNS_TOPIC)
    } catch (e: any) {
      Logger.error('Error on send IP', 'NotificationService');
    }
    return this.authService.login(req.user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('refresh-login')
  async refreshLogin(@Req() req: any) {
    return this.authService.refreshLogin(req.user);
  }
}
