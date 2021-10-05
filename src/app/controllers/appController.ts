import { Request, RequestHandler, Response } from 'express'
import { param, validationResult } from 'express-validator'
import { Urls } from '../../api/v1/models/url'

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

    try {
      let url = await Urls.findOne({ identifier: req.params.id })
      if (url) {
        url.hitCount += 1
        await url.save()
        res.status(302).redirect(url.url)
      } else {
        res.sendStatus(404)
      }
    } catch (err) {
      res.sendStatus(500)
    }
  }
}
