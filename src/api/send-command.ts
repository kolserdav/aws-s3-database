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
      callback(response.err, response.res);
    });
	}


	listObjects(options: Types.Options, callback: Types.Resolve): void {
    const params: S3.Types.ListObjectsRequest = {
			Bucket: options.databaseName,
			Delimiter: options.delimiter,
			Prefix: options.prefix
    };
    const result: Request<S3.Types.ListObjectsOutput, AWSError> = s3.listObjectsV2(params, (err: AWSError, data: S3.Types.ListObjectsOutput) => {
      const res = S3DbHandlers.setResponseFromAWS(err, data);
			const response = this.helper.revertAttributes(res);
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

	deleteObjects(options: Types.Options, callback: Types.Resolve): void {
    const params: S3.Types.DeleteObjectsRequest = {
			Bucket: options.databaseName,
			Delete: {
				Objects: options.deleteObjects
			}
    };
    const result: Request<S3.Types.DeleteObjectsOutput, AWSError> = s3.deleteObjects(params, (err: AWSError, data: S3.Types.DeleteObjectsOutput) => {
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
		const result: Request<{}, AWSError> = s3.deleteBucket(params, (err: AWSError, data: {}) => {
			const res = S3DbHandlers.setResponseFromAWS(err, data);
			const response = this.helper.revertAttributes(res);
			callback(response.err, response.res);
		});
	}


	deleteObject(options: Types.Options, callback: Types.Resolve): void {
		const params: S3.Types.DeleteObjectRequest = {
			Bucket: options.databaseName,
			Key: options.key
		};
		const result: Request<{}, AWSError> = s3.deleteObject(params, (err: AWSError, data: S3.Types.DeleteObjectOutput) => {
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
	

	getObjectAcl(options: Types.Options, callback: Types.Resolve): void {
    const params: S3.Types.GetObjectAclRequest = {
			Bucket: options.databaseName,
			Key: options.key
    };
    const result: Request<S3.Types.GetObjectAclOutput, AWSError> = s3.getObjectAcl(params, (err: AWSError, data: S3.Types.GetObjectAclOutput) => {
      const res = S3DbHandlers.setResponseFromAWS(err, data);
			const response = this.helper.revertAttributes(res);
			callback(response.err, response.res);
		});
  }
} 

export default SendCommand;
