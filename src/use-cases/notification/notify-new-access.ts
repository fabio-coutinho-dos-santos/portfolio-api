import AwsNotificationServiceInterface from "src/frameworks/notification/aws-sns/aws-notification-service.interface";

export class NotifyNewAccess {
  constructor(private readonly notificationService: AwsNotificationServiceInterface) {}
  
  async execute() {
    await this.notificationService.notify(`New Access in Portfolio application`, process.env.AWS_SNS_TOPIC)
  }
}