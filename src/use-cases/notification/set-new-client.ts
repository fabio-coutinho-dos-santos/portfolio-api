import { Logger } from "@nestjs/common";
import AwsNotificationServiceInterface from "src/frameworks/notification/aws-sns/aws-notification-service.interface";
import { AwsSnsProtocols } from "src/frameworks/notification/aws-sns/aws-sns-protocol.enum";

export class SetNewSnsClient {
  constructor(private readonly notificationService: AwsNotificationServiceInterface|AwsNotificationServiceInterface) { }

  async createNewSnsTopic(topicName: string): Promise<any> {
    try {
      const newTopicArn = await this.notificationService.createSnsTopic(topicName);
      return Promise.resolve(newTopicArn)
    } catch (e: any) {
      Logger.error(e.toString)
      throw new Error('Error create new sns topic')
    }
  }

  async createNewSnsSubscriber(topcicArn: string, protocol: AwsSnsProtocols, endpoint: string): Promise<any> {
    try {
      const response = await this.notificationService.createSnsSubscribe(topcicArn, protocol, endpoint)
      return Promise.resolve(response);
    } catch (e: any) {
      Logger.error(e.toString)
      throw new Error('Error on create new subscriber')
    }
  }
}