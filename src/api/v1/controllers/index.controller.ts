import { Request, Response } from 'express'
import { jsonResponse } from '../../../common/models/response.model'

export class ApiController {
  public static getRoot(req: Request, res: Response) {
    jsonResponse().body({ message: 'URL Shortener API v1' }).send(res)
  }
}
