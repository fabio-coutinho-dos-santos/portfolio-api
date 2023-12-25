export enum AwsSnsProtocols {
  EMAIL = 'email',
  SMS = 'sms',
  APPLICATION = 'application',
  HTTP = 'http',
  LAMBDA = 'lambda',
  SQS = 'sqs'
}

// Protocol: 'sms',
// Endpoint: '+1234567890', // Replace with the phone number

// Protocol: 'application',
// Endpoint: 'arn:aws:sns:us-east-1:123456789012:endpoint/APNS/GCM/YourMobileApp/abcd1234-5678-9012-3456-789012345678',

// Protocol: 'http',
// Endpoint: 'http://example.com/notification',

// Protocol: 'lambda',
// Endpoint: 'arn:aws:lambda:us-east-1:123456789012:function:YourLambdaFunction',

// Protocol: 'sqs',
// Endpoint: 'arn:aws:sqs:us-east-1:123456789012:YourSQSQueue',