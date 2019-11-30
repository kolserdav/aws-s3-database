import * as Types from '../types';
import * as AWS from 'aws-sdk';
import S3 from 'aws-sdk/clients/s3';
import S3DbHandlers from '../handlers/index';
import { AWSError } from 'aws-sdk/lib/error';
import { Request } from 'aws-sdk/lib/request';

const s3 = new AWS.S3()
class SendCommand implements Types.SendCommandInterface {

	helper: any = new S3DbHandlers.helper();

	constructor(options: Types.Options, callback: Types.Resolve) {
		const command = options.command;
		switch(command) {
			case 'create-bucket':
					this.createBucket(options, callback);
				break;
			case 'delete-bucket': 
					this.deleteBucket(options, callback);
				break;
			case 'get-bucket-acl':
				this.getBucketAcl(options, callback);
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
		const result: Request<S3.Types.CreateBucketOutput, AWSError> = s3.createBucket(params, (err: AWSError, data: S3.Types.CreateBucketOutput) => {
			const res = S3DbHandlers.setResponseFromAWS(err, data);
			const response = this.helper.revertAttributes(res);
			callback(response.err, response.res);
		});
	}

	deleteBucket(options: Types.Options, callback: Types.Resolve): void {
		const params: S3.Types.DeleteBucketRequest = {
			Bucket: options.databaseName,
		};
		console.log(params)
		const result: Request<{}, AWSError> = s3.deleteBucket(params, (err: AWSError, data: {}) => {
			const res = S3DbHandlers.setResponseFromAWS(err, data);
			const response = this.helper.revertAttributes(res);
			callback(response.err, response.res);
		});
	}

	getBucketAcl(options: Types.Options, callback: Types.Resolve): void {
    const params: S3.Types.GetBucketAclRequest = {
      Bucket: options.databaseName,
    };
    const result: Request<S3.Types.GetBucketAclOutput, AWSError> = s3.getBucketAcl(params, (err: AWSError, data: S3.Types.GetBucketAclOutput) => {
      const res = S3DbHandlers.setResponseFromAWS(err, data);
			const response = this.helper.revertAttributes(res);
			callback(response.err, response.res);
		});
  }

} 

export default SendCommand;
