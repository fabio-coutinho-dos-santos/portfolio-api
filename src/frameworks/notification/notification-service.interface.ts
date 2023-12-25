export default interface NotificationServiceInterface {
  config():Promise<any>
  notify(message: any, topic: string):Promise<any>
}