import * as Types from './types';
import ApiS3Db from './api/index';
import S3 from 'aws-sdk/clients/s3';


class S3Db extends ApiS3Db.sendCommand implements Types.S3DbInterface {

	constructor() {
		super();
	}

	createColumn = (options: Types.Options, callback: Types.Resolve): void => {

	};

	createDatabase = (options: Types.Options, callback: Types.Resolve): void => {		
		const newOptions = options;
		newOptions.command = 'create-bucket';
		const resolve = (error: Types.Error | null, data: Types.Data) => {
			if (error !== null) {
				const errorCode = error.code;
				switch(error.code) {
					case 'BucketAlreadyOwnedByYou':
						const result: Types.Data = {
							error: false,
							body: {message: 'Database installed before!'},
							result: 'warning'
						};
						callback(null, result);
						break;
					case 'InvalidBucketName':
						const error: Types.Error = {
							error: true,
							message: 'Database name is not valid.',
							code: errorCode
						}
						callback(error, null);
				}
			}
			else {
				const result: Types.Data = {
						error: false,
						body: {message: 'Create database complete!'},
						result: 'success'
				}
				callback(null, result);
			}
		};
		this.createBucket(newOptions, resolve);
	}

	createTable = (options: Types.Options, callback: Types.Resolve): void => {
		const newOptions = options;
		newOptions.command = 'put-object';
		newOptions.body = {
			table: options.tableName
		};
		newOptions.key = `${options.tableName}/index.json`;
		const resolve = (error: Types.Error | null, data: Types.Data) => {
			if (error !== null) {
				console.log(error)
				console.log(options)
				const errorCode = error.code;
				switch(error.code) {
					case 'BucketAlreadyOwnedByYou':
						const result: Types.Data = {
							error: false,
							body: {message: 'Database installed before!'},
							result: 'warning'
						};
						callback(null, result);
						break;
					case 'InvalidBucketName':
						const error: Types.Error = {
							error: true,
							message: 'Database name is not valid.',
							code: errorCode
						}
						callback(error, null);
				}
			}
			else {
				const result: Types.Data = {
						error: false,
						body: {message: 'Table created'},
						result: 'success'
				}
				console.log(options)
				callback(null, result);
			}
			console.log(data)
		};
		this.getObject(newOptions, resolve)
		//this.putObject(newOptions, resolve);
	};

	deleteDatabase = (options: Types.Options, callback: Types.Resolve): void => {	
		const newOptions = options;
		newOptions.command = 'delete-database';
		const resolve = (error: Types.Error | null, data: Types.Data) => {
			if (error !== null) {
				const errorCode = error.code;
				switch(error.code) {
					case 'NoSuchBucket':
						const result: Types.Data = {
							error: false,
							body: {message: 'Database undefined.'},
							result: 'warning'
						};
						callback(null, result);
						break;
					case 'InvalidBucketName':
						const error: Types.Error = {
							error: true,
							message: 'Database name is not valid.',
							code: errorCode
						}
						callback(error, null);
				}
			}
			else {
				const result: Types.Data = {
						error: false,
						body: {message: 'Delete database complete!'},
						result: 'success'
				}
				callback(null, result);
			}
		};
		this.deleteBucket(newOptions, resolve);
	};

	deleteTable = (options: Types.Options, callback: Types.Resolve): void => {

	};

	deleteColumn = (options: Types.Options, callback: Types.Resolve): void => {

	};

	deleteLine = (options: Types.Options, callback: Types.Resolve): void => {

	};

	getCellValue = (options: Types.Options, callback: Types.Resolve): void => {

	};

	insertLine = (options: Types.Options, callback: Types.Resolve): void => {

	};

	setCellValue = (options: Types.Options, callback: Types.Resolve): void => {

	};

	updateValue = (options: Types.Options, callback: Types.Resolve): void => {

	};
}

export default S3Db;


