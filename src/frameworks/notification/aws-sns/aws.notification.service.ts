import { Injectable, Logger } from "@nestjs/common";
import NotificationServiceInterface from "../notification-service.interface";
import { CreateTopicCommand, PublishCommand, SNSClient, SubscribeCommand } from "@aws-sdk/client-sns";
import AwsNotificationServiceInterface from "./aws-notification-service.interface";
import { AwsSnsProtocols } from "./aws-sns-protocol.enum";

@Injectable()
export default class AwsNotificationService implements AwsNotificationServiceInterface {

  constructor(private readonly snsClient: SNSClient) { }

  async createSnsTopic(topicName: string): Promise<any> {
    try {
      const createTopicResponse = await this.snsClient.send(new CreateTopicCommand({ Name: topicName }));
      const topicArn = createTopicResponse.TopicArn;
      Logger.log('Sns Topic Created!')
      return Promise.resolve(topicArn);
    } catch (e: any) {
      Logger.error(e.toString())
      throw new Error('Error on create sns topic')
    }

  }

  async createSnsSubscribe(topicArn: string, protocol: AwsSnsProtocols, endpoint: string): Promise<any> {
    try {
      const subscribeResponse = await this.snsClient.send(
        new SubscribeCommand({
          TopicArn: topicArn,
          Protocol: protocol,
          Endpoint: endpoint,
        })
      );
      Logger.log('Subscriber Created!');
      return Promise.resolve(subscribeResponse);
    } catch (error) {
      Logger.error('Error creating SNS topic:', error);
      throw new Error('Error on create sns subscribet');
    }
  }

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