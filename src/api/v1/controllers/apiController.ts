import { Request, Response } from 'express'
import { jsonResponse } from '../../../common/models'
import urlUtils from '../../../utils/urlUtils'

export class ApiController {
  public static getRoot(req: Request, res: Response) {
    jsonResponse()
      .data({
        name: 'URL Shortener API',
        version: '1.0.0',
        baseUrl: urlUtils.baseUrl()
      })
      .send(res)
  }
}
