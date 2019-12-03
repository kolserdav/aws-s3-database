import * as Types from '../types';
import * as AWS from 'aws-sdk';
import S3 from 'aws-sdk/clients/s3';
import S3DbHandlers from '../handlers/index';
import { AWSError } from 'aws-sdk/lib/error';
import { Request } from 'aws-sdk/lib/request';

const s3 = new AWS.S3()
class SendCommand implements Types.SendCommandInterface {

	helper: any;

	constructor() {
		this.helper = new S3DbHandlers.helper();
	}

	getObject(options: Types.Options, callback: Types.Resolve): void {
    const params: S3.Types.GetObjectRequest = {
			Bucket: options.databaseName,
			Key: options.key,
			Range: options.range
    };
    const result: Request<S3.Types.GetObjectOutput, AWSError> = s3.getObject(params, (err: AWSError, data: S3.Types.GetObjectOutput) => {
      const res = S3DbHandlers.setResponseFromAWS(err, data);
      const response = this.helper.revertAttributes(res);
			response.res.result = JSON.stringify(response.res.body.Body.toString());
      callback(response.err, response.res);
    });
	}


	listObjects(options: Types.Options, callback: Types.Resolve): void {
    const params: S3.Types.ListObjectsRequest = {
			Bucket: options.databaseName,
			MaxKeys: options.maxKeys
    };
    const result: Request<S3.Types.ListObjectsOutput, AWSError> = s3.listObjects(params, (err: AWSError, data: S3.Types.ListObjectsOutput) => {
      const res = S3DbHandlers.setResponseFromAWS(err, data);
			const response = this.helper.revertAttributes(res);
			if (response.res !== null && !response.res.error) {
				response.res.result = response.res.body.Contents;
				response.res.body.Contents = undefined;
			}
      callback(response.err, response.res);
    });
	}

	headObject(options: Types.Options, callback: Types.Resolve): void {
    const params: S3.Types.HeadObjectRequest = {
			Bucket: options.databaseName,
			Key: options.key,
    };
    const result: Request<S3.Types.HeadObjectOutput, AWSError> = s3.putObject(params, (err: AWSError, data: S3.Types.HeadObjectOutput) => {
			const res = S3DbHandlers.setResponseFromAWS(err, data);
      const response = this.helper.revertAttributes(res);
      callback(response.err, response.res);
    });
	}

	putObject(options: Types.Options, callback: Types.Resolve): void {
    const params: S3.Types.PutObjectRequest = {
			Bucket: options.databaseName,
			Key: options.key,
			Body: JSON.stringify(options.body),
			ContentType: 'application/json'
    };
    const result: Request<S3.Types.PutObjectOutput, AWSError> = s3.putObject(params, (err: AWSError, data: S3.Types.PutObjectOutput) => {
			const res = S3DbHandlers.setResponseFromAWS(err, data);
      const response = this.helper.revertAttributes(res);
      callback(response.err, response.res);
    });
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
