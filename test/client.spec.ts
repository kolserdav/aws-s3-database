import Types from '../types';
import S3Db from '../index';
const client = new S3Db();
const options: Types.Options = {
      command: 'list-objects',
      databaseName: 'dasds4343dasd',
      tableName: 'dsadad',
      key: 'dd1.json',
      range: 'bytes=6-15',
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
	console.log(data)
}
client.createTable(options, resolve)
