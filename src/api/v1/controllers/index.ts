import { Request, Response } from 'express';
import { JSONResponse } from '../../../models/response';

export * from './urls/urls';

export class ApiController {
  public static getRoot(req: Request, res: Response) {
    res.json(JSONResponse.from(200, { message: 'URL Shortener API v1' }));
  }
}
