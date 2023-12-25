import { Injectable } from "@nestjs/common";
import NotificationServiceInterface from "../notification-service.interface";
import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";
import AwsNotificationServiceInterface from "./aws-notification-service.interface";

@Injectable()
export default class AwsNotificationService implements AwsNotificationServiceInterface {

  constructor(private readonly snsClient: SNSClient) {}

  async notify(message: any, topic: string): Promise<any> {
    const response = await this.snsClient.send(
      new PublishCommand({
        Message: message,
        TopicArn: topic,
      }),
    );
    return Promise.resolve(response);
  };
}