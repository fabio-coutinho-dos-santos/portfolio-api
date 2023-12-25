import { Test, TestingModule } from "@nestjs/testing";
import AwsNotificationService from "./aws.notification.service";

describe('Aws Notification Service', () => {
  let awsNotificationCervice: AwsNotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AwsNotificationService],
    }).compile();

    awsNotificationCervice = module.get<AwsNotificationService>(AwsNotificationService);
  });
  it('shold be defined', async () => {
    expect(awsNotificationCervice).toBeDefined();
  })
})