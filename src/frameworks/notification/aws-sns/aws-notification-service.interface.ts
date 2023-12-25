import NotificationServiceInterface from "../notification-service.interface";

// Applying the SOLID Segretation Interface Principle
export default interface AwsNotificationServiceInterface extends Partial<NotificationServiceInterface> {
  notify(message:any, topic: string): Promise<any>
}