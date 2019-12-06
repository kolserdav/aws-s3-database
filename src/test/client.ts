import Types from '../types';
import S3Db from '../index';
const client = new S3Db();
const options: Types.Options = {
	command: 'list-objects',
	databaseName: 'dasds4343dasd',
	tableName: 'users',
	column: 'password',
	key: 'users/index.json',
	range: 'bytes=0-80',
	prefix: 'dsadadfd/column1/',
	file: './dd',
	maxKeys: 4,
	stdError: []
};
options.body = {res: 'mewsdasd'};
const resolve = (error: Types.Error | null, data: Types.Data) => {
	if (error !== null) {
		console.log('Error', error)
		console.log(options)
	}
	console.log('Data', data)
}
client.getObject(options, resolve)
