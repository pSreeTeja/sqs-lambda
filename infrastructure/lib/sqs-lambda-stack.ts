import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { SqsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
import * as path from 'path'

export class SqsLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const queue = new sqs.Queue(this, 'SqsLambdaQueue', {
      visibilityTimeout: cdk.Duration.seconds(300)
    });
    const lambdaFunction = new lambda.Function(this,'MyLambdaFunction',{
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset(path.join(__dirname,'../../handlerLambda/')),
      handler: 'src.index.handler',
    })

    queue.grantConsumeMessages(lambdaFunction);

    lambdaFunction.addEventSource(new SqsEventSource(queue,{batchSize:1}));


  }
}
