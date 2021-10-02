import { IJSONResponse } from '../interfaces/response.interface';
import { getReasonPhrase } from 'http-status-codes';
import { Response } from 'express';

export class JSONResponse implements IJSONResponse {
  constructor(
    public status: { code: number; message: string },
    public data?: any,
    public errors?: any
  ) {}

  public static init(
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

  public body(any: any = null): JSONResponse {
    this.data = any;
    return this;
  }

  public error(any: any = null): JSONResponse {
    this.errors = any;
    return this;
  }

  public send(res: Response) {
    res.status(this.status.code).json(this);
  }
}

export const jsonResponse = (status: number = 200): JSONResponse => {
  return JSONResponse.init(status, null, null);
};
