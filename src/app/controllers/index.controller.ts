import { Request, RequestHandler, Response } from 'express'
import { param, validationResult } from 'express-validator'
import { IUrl } from '../../api/v1/interfaces/url.interface'
import Url from '../../api/v1/models/url.model'

export class AppController {
  public static root(req: Request, res: Response) {
    res.send('<h1>URL Shortener</h1><h5>v1.0.0</h5>')
  }

  public static redirect(): RequestHandler[] {
    return [
      param('id').isLength({ min: 4, max: 8 }).isAscii(),
      this.redirectHandler
    ]
  }

  private static async redirectHandler(req: Request, res: Response) {
    if (!validationResult(req).isEmpty()) {
      res.sendStatus(404)
      return
    }

    const updateIfFound = (url: IUrl | null) => {
      return new Promise<IUrl>((resolve, reject) => {
        if (url == null) {
          reject(true)
          return
        }
        url.hitCount += 1
        resolve(url)
      })
    }

    Url.findOne({ identifier: req.params.id })
      .then((url) => updateIfFound(url))
      .then((url) => res.status(302).redirect(url.url))
      .catch((notFound) => res.sendStatus(notFound === true ? 404 : 500))
  }
}
