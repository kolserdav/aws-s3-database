import * as Types from '../types';


export default class Helper implements Types.HelperInterface {
	
	revertAttributes(res: Types.Response<Types.Error, Types.Data>): Types.PreparedObject {
		let result: Types.PreparedObject;
		if (res.result.error) {
			result = {
				err: res.result,
				res: null
			}
		}
		else {
			result = {
				err: null,
				res: res.result
			}
		}
		return result;
	}
}
