import { 
	S3DbInterface, 
	ErrorS3Db, 
	ResolveS3DbType, 
	OptionsS3DbType 
} from './types';
import ApiS3Db from '../index';
import S3 from 'aws-sdk/clients/s3';

class S3Db implements S3DbInterface {

	
	createColumn = (options: OptionsS3DbType, callback: ResolveS3DbType): void => {

	};

	createDatabase = (options: OptionsS3DbType, callback: ResolveS3DbType): void => {

	};

	createTable = (options: OptionsS3DbType, callback: ResolveS3DbType): void => {

	};

	deleteDatabase = (options: OptionsS3DbType, callback: ResolveS3DbType): void => {

	};

	deleteTable = (options: OptionsS3DbType, callback: ResolveS3DbType): void => {

	};

	deleteColumn = (options: OptionsS3DbType, callback: ResolveS3DbType): void => {

	};

	deleteLine = (options: OptionsS3DbType, callback: ResolveS3DbType): void => {

	};

	getCellValue = (options: OptionsS3DbType, callback: ResolveS3DbType): void => {

	};

	insertLine = (options: OptionsS3DbType, callback: ResolveS3DbType): void => {

	};

	setCellValue = (options: OptionsS3DbType, callback: ResolveS3DbType): void => {

	};

	updateValue = (options: OptionsS3DbType, callback: ResolveS3DbType): void => {

	};
}



