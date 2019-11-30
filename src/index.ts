import * as Types from './types';
import ApiS3Db from './api/index';
import S3 from 'aws-sdk/clients/s3';

class S3Db implements Types.S3DbInterface {

	constructor() {
		const options: Types.Options = {
			command: 'create-bucket',
			databaseName: 'dasds4343ddsasd'
		};
		const resolve = (error: Types.Error | null, data: Types.Data) => {
			if (error !== null) {
				console.log('Error', error)
			}
			console.log('Data', data)
		}
		new ApiS3Db.sendCommand(options, resolve);
	}
	createColumn = (options: Types.Options, callback: Types.Resolve): void => {

	};

	createDatabase = (options: Types.Options, callback: Types.Resolve): void => {

	};

	createTable = (options: Types.Options, callback: Types.Resolve): void => {

	};

	deleteDatabase = (options: Types.Options, callback: Types.Resolve): void => {

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
const s = new S3Db;


