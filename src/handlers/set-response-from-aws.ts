import * as Types from '../types';
import { AWSError } from 'aws-sdk/lib/error';

export default function SetResponseFromAWS(err: AWSError, data: object): Types.Response<Types.Error, Types.Data> {

	let resObj: Types.Response<Types.Error, Types.Data>;
		if (err) {
        const error: Types.Error = { 
          error: true,
          message: err.message,
          code: err.code,
				};
				resObj = {
					result: error
				};
      }
      else {
        const body: Types.Data = {
          error: false,
          body: data
        };
				resObj = {
					result: body
				}
			}
		return resObj;
}
