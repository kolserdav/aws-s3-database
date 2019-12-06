import * as Types from './types';
import ApiS3Db from './api/index';
import S3 from 'aws-sdk/clients/s3';


class S3Db extends ApiS3Db.sendCommand implements Types.S3DbInterface {

	constructor() {
		super();
	}

	createColumn = (options: Types.Options, callback: Types.Resolve): void => {
		const newOptions = options;
		newOptions.command = 'create-column';
		newOptions.key = `${options.tableName}/${options.column}/index.json`;
		newOptions.body = {
			column: options.column,
			length: 0,
			cells: []
		};
		const resolve = (error: Types.Error | null, data: Types.Data) => {
			if (error !== null) {
				const errorCode: string | object = error.code;
				console.log(error)
				switch (error.code) {
					case 'NoSuchKey':
							newOptions.stdError = error;
							this.putObject(newOptions, callback);
						break;
					default:
						callback(error, null);
				}
			}
			else {
						const error: Types.Error = {
							error: true,
							message: 'Column created before',
							code: data.body
						}
						callback(error, null);
			}
		}
		this.getObjectAcl(newOptions, resolve);
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
							result: {message: 'warning'}
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
					result: {message: 'success'}
				}
				callback(null, result);
			}
		};
		this.createBucket(newOptions, resolve);
	}

	createTable = (options: Types.Options, callback: Types.Resolve): void => {
		const newOptions = options;
		newOptions.command = 'create-table';
		newOptions.body = {
			table: options.tableName
		};
		newOptions.key = `${options.tableName}/index.json`;
		const resolve = (error: Types.Error | null, data: Types.Data) => {
			if (error !== null) {
				const errorCode = error.code;
				switch(error.code) {
					case 'NoSuchKey':
							this.putObject(newOptions, callback)
						break;
					default:
						callback(error, null);
				}
			}
			else {
				const result: Types.Data = {
					error: false,
					body: {message: 'Table created'},
					result: {message: 'success'}
				}
				callback(null, result);
			}
		};
		this.getObjectAcl(newOptions, resolve);
	};

	listTables = (options: Types.Options, callback: Types.Resolve): void => {
		const newOptions = options;
		newOptions.command = 'list-tables';
		newOptions.delimiter = (options.delimiter)? options.delimiter : '/';
		newOptions.prefix = (options.prefix)? options.prefix : '';
		const resolve = (error: Types.Error | null, data: Types.Data) => {
			if (error !== null) {
				const errorCode = error.code;
				console.log(error)
			}
			else {
				const result: Types.Data = {
					error: false,
					body: data.body,
					result: {message: 'sucess'}
				}
				callback(null, result);
			}
		};
		this.listObjects(newOptions, resolve);
	};

	listColumns = (options: Types.Options, callback: Types.Resolve): void => {
		const newOptions = options;
		newOptions.command = 'list-columns';
		newOptions.delimiter = (options.delimiter)? options.delimiter : '/';
		newOptions.prefix = (options.prefix)? options.prefix : options.tableName + '/';
		const resolve = (error: Types.Error | null, data: Types.Data) => {
			if (error !== null) {
				const errorCode = error.code;
				console.log(error)
			}
			else {
				const result: Types.Data = {
					error: false,
					body: data.body,
					result: {message: 'sucess'}
				}
				callback(null, result);
			}
		};
		this.listObjects(newOptions, resolve);
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
							result: {message: 'warning'}
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
					result: {message: 'success'}
				}
				callback(null, result);
			}
		};
		this.deleteBucket(newOptions, resolve);
	};

	deleteTable = (options: Types.Options, callback: Types.Resolve): void => {
		const newOptions = options;
		newOptions.command = 'delete-table';
		newOptions.prefix = options.tableName + '/';
		const resolve = (error: Types.Error, data: Types.Data) => {
			if (error) {
				console.log(error);
			}
			else {
				newOptions.deleteObjects = [];
				const contents = data.body.Contents;
				for (let i in contents) {
					newOptions.deleteObjects.push({
						Key: contents[i].Key
					})
				}
				this.deleteObjects(newOptions, callback);
			}
		}
		this.listObjects(newOptions, resolve);
	};

	deleteColumn = (options: Types.Options, callback: Types.Resolve): void => {
		const newOptions = options;
		newOptions.command = 'delete-column';
		newOptions.prefix = options.tableName + '/' + options.column + '/';
		const resolve = (error: Types.Error, data: Types.Data) => {
			if (error) {
				console.log(error);
			}
			else {
				newOptions.deleteObjects = [];
				const contents = data.body.Contents;
				for (let i in contents) {
					newOptions.deleteObjects.push({
						Key: contents[i].Key
					})
				}
				this.deleteObjects(newOptions, callback);
			}
		}
		this.listObjects(newOptions, resolve);
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


