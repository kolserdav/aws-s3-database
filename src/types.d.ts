
import S3 from 'aws-sdk/clients/s3';
import { AWSError } from 'aws-sdk/lib/error';

export interface ColumnOptions {
	columnName: string
	
}

export interface Data {
	error: boolean
	body: string | object
	column?: string
	cell?: string
}

export interface CellOptions {
	id: string
	columnName: string
	data?: string | object
}

export interface Resolve {
	(error: Error | null, data: Data | null): void
}

export interface Options {
	command: string
	databaseName: string
	data?: Data;
	cellOptions?: CellOptions
	columnOptions?: ColumnOptions
}

export interface Error {
	error: boolean
	message: string
	code: string
}

export type PreparedObject = {
	res: any,
	err: any
}

export interface HelperInterface {
	revertAttributes(res: Response<Error, Data>): PreparedObject
}

export interface Response<T1, T2> {
	result: T1 | T2
}

export interface ApiInterface {
	sendCommand(options: Options, callback: Resolve): Data | Error
}

export type SendCommandType = {
	(options: Options, callback: Resolve): void
}

export interface SendCommandInterface {
	helper: any
	createBucket: SendCommandType
	deleteBucket: SendCommandType
	getBucketAcl: SendCommandType
}

export interface S3DbInterface {
	createColumn(options: Options, callback: Resolve): void
	createDatabase(options: Options, callback: Resolve): void
	createTable(options: Options, callback: Resolve): void
	deleteDatabase(options: Options, callback: Resolve): void
	deleteTable(options: Options, callback: Resolve): void
	deleteColumn(options: Options, callback: Resolve): void
	deleteLine(options: Options, callback: Resolve): void
	getCellValue(options: Options, callback: Resolve): void
	insertLine(options: Options, callback: Resolve): void
	setCellValue(options: Options, callback: Resolve): void
	updateValue(options: Options, callback: Resolve): void
	
	
}
