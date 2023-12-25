import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { LocalStrategy } from '../../core/strategies/local.strategy';
import { JwtStrategy } from '../../core/strategies/jwt.strategy';
import { UserRepository } from '../user/user.repository';
import { AuthController } from 'src/controllers/auth.controller';
import NotificationServiceInterface from 'src/frameworks/notification/notification-service.interface';
import AwsNotificationService from 'src/frameworks/notification/aws-sns/aws.notification.service';
import { SNSClient } from '@aws-sdk/client-sns';

@Module({
  controllers: [AuthController],
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    UserModule,
    JwtModule.register({
      privateKey: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    ConfigModule,
    {
      provide: "NotificationServiceInterface",
      useFactory: () => {
        const awsConfig = {
          region: process.env.AWS_REGION, // AWS region
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY, // Replace with your access key ID
            secretAccessKey: process.env.AWS_SECRET, // Replace with your secret access key
          }
        }
        const snsClient = new SNSClient(awsConfig)
        return new AwsNotificationService(snsClient)
      }, inject: [ConfigModule]
    }
  ],
})
export class AuthModule { }
