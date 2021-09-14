import { IJSONResponse } from '../interfaces/response';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { AnyArray } from 'mongoose';

export class JSONResponse implements IJSONResponse {
  constructor(
    public status: { code: number; message: string },
    public data?: any,
    public errors?: any
  ) {}

  public static from(
    statusCode: number,
    data?: any,
    errors?: any
  ): JSONResponse {
    const status = {
      code: statusCode,
      message: getReasonPhrase(statusCode)
    };
    return new JSONResponse(status, data, errors);
  }
}
