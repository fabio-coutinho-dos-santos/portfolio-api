import AwsNotificationService from "src/frameworks/notification/aws-sns/aws.notification.service";

export class NotifyNewAccess {
  constructor(private readonly notificationService: AwsNotificationService) {}
  
  async execute() {
    await this.notificationService.notify(`New Access in Portfolio application`, process.env.AWS_SNS_TOPIC)
  }
}