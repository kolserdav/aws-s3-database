import { 
	ApiS3DbInterface, 
	OptionsS3DbType,
	ResolveS3DbType,
	DataS3Db,
	ErrorS3Db	
} from '../types';

	
const SendCommand = (options: OptionsS3DbType, callback: ResolveS3DbType): DataS3Db | ErrorS3Db => {
	console.log(43);
	return {
		error: false,
		column: 'te',
		cell: 'tes',
		body: 'test',
	}

}; 

export default SendCommand;
