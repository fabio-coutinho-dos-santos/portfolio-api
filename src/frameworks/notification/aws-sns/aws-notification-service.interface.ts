import NotificationServiceInterface from "../notification-service.interface";
import { AwsSnsProtocols } from "./aws-sns-protocol.enum";

// Applying the SOLID Segretation Interface Principle
export default interface AwsNotificationServiceInterface extends Partial<NotificationServiceInterface> {
  notify(message:any, topic: string): Promise<any>
  createSnsSubscribe(topicArc: string, protocol: AwsSnsProtocols, endpoint: string)
  createSnsTopic(topicName: string)
}