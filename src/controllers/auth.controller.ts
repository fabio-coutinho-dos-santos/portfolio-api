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
import { AwsSnsProtocols } from 'src/frameworks/notification/aws-sns/aws-sns-protocol.enum';
import AwsNotificationService from 'src/frameworks/notification/aws-sns/aws.notification.service';
import NotificationServiceInterface from 'src/frameworks/notification/notification-service.interface';
import { AuthService } from 'src/use-cases/auth/auth.service';
import { NotifyNewAccess } from 'src/use-cases/notification/notify-new-access';
import { SetNewSnsClient } from 'src/use-cases/notification/set-new-client';

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
      // const newSnsClient = new SetNewSnsClient(this.notificationService)
      // const newTopicArn = await newSnsClient.createNewSnsTopic('topic-test')
      // await newSnsClient.createNewSnsSubscriber(process.env.AWS_SNS_TOPIC, AwsSnsProtocols.EMAIL, 'fabio_santcou@hotmail.com')
      await new NotifyNewAccess(this.notificationService).execute()
    } catch (e: any) {
      Logger.error('Error on send notification', 'NotificationService');
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
