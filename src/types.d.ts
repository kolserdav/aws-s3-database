export interface ColumnOptions {
	columnName: string
	
}

type DataS3Db = {
	error: boolean
	column: string
	cell: string
	body: string | object
}

export interface CellOptions {
	id: string
	columnName: string
	data?: string | object
}

type ResolveS3DbType = {
	push(error: ErrorS3Db | null, data: DataS3Db | null): void
}

type OptionsS3DbType = (data: object) => {
	command: string
	data?: DataS3Db;
	cellOptions?: CellOptions
	columnOptions?: ColumnOptions
}

type ErrorS3Db = {
	error: boolean
	message: string
	stack: string | object
	stdErr?: string | object
}

export interface ApiS3DbInterface {
	sendCommand(options: OptionsS3DbType, callback: ResolveS3DbType): DataS3Db | ErrorS3Db
}

export interface S3DbInterface {
	createColumn(options: OptionsS3DbType, callback: ResolveS3DbType): void
	createDatabase(options: OptionsS3DbType, callback: ResolveS3DbType): void
	createTable(options: OptionsS3DbType, callback: ResolveS3DbType): void
	deleteDatabase(options: OptionsS3DbType, callback: ResolveS3DbType): void
	deleteTable(options: OptionsS3DbType, callback: ResolveS3DbType): void
	deleteColumn(options: OptionsS3DbType, callback: ResolveS3DbType): void
	deleteLine(options: OptionsS3DbType, callback: ResolveS3DbType): void
	getCellValue(options: OptionsS3DbType, callback: ResolveS3DbType): void
	insertLine(options: OptionsS3DbType, callback: ResolveS3DbType): void
	setCellValue(options: OptionsS3DbType, callback: ResolveS3DbType): void
	updateValue(options: OptionsS3DbType, callback: ResolveS3DbType): void
	
	
}
