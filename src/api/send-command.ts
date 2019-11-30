import * as Types from '../types';
import * as AWS from 'aws-sdk';
import S3 from 'aws-sdk/clients/s3';
import S3DbHandlers from '../handlers/index';
import { AWSError } from 'aws-sdk/lib/error';
import { Request } from 'aws-sdk/lib/request';

const s3 = new AWS.S3()
class SendCommand implements Types.SendCommandInterface {

	constructor(options: Types.Options, callback: Types.Resolve) {
		const command = options.command;
		switch(command) {
			case 'create':
					this.createBucket(options, callback);
				break;
			case 'delete': 
					this.deleteBucket(options, callback);
				break;
		}
	}

	createBucket(options: Types.Options, callback: Types.Resolve): void {
		const params: S3.Types.CreateBucketRequest = {
			Bucket: options.databaseName,
			CreateBucketConfiguration: {
				LocationConstraint: "us-west-2",
			}
		};
		console.log('Params', params)
		const result: Request<object, AWSError> = s3.createBucket(params, (err: AWSError, data: object) => {
			const res = S3DbHandlers.setResponseFromAWS(err, data);
			console.log('Result', res)
		});
	}

	deleteBucket(options: Types.Options, callback: Types.Resolve): void {
		const params: S3.Types.CreateBucketRequest = {
			Bucket: options.databaseName,
			CreateBucketConfiguration: {
				LocationConstraint: "us-west-2",
			}
		};
		console.log(params)
		const result: Request<object, AWSError> = s3.deleteBucket(params, (err: AWSError, data: object) => {
			if (err) {
				const error: Types.Error = {
					error: true,
					message: err.message,
					code: err.code,
				};
				callback(error, null);
			}
			else {
				const result: Types.Data = {
					error: false,
					body: data
				};
				callback(null, result);
			}
		});
	}
} 

export default SendCommand;
