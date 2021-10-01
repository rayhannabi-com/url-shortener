import { Request, RequestHandler, Response } from 'express';
import { param, validationResult } from 'express-validator';
import Url from '../../models/api/v1/url.model';

export class AppController {
  public static root(req: Request, res: Response) {
    res.send('<h1>URL Shortener</h1><h5>v1.0.0</h5>');
  }

  public static redirect(): RequestHandler[] {
    const validation = param('id').isLength({ min: 4, max: 8 }).isAscii();
    return [validation, this.redirectHandler];
  }

  private static async redirectHandler(req: Request, res: Response) {
    const errors = validationResult(req).array();
    if (errors.length > 0) {
      res.sendStatus(404);
    } else {
      let urlObj = await Url.findOne({ identifier: req.params.id });
      if (urlObj) {
        urlObj.hitCount += 1;
        await urlObj.save();
        res.status(302).redirect(urlObj.url);
      } else {
        res.sendStatus(404);
      }
    }
  }
}
