import { Request, Response } from 'express';
import { jsonResponse } from '../../../models/common/response.model';

export * from './urls/urls.controller';

export class ApiController {
  public static getRoot(req: Request, res: Response) {
    res.json(jsonResponse().body({ message: 'URL Shortener API v1' }));
  }
}
