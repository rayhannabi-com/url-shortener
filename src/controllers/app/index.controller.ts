import { Request, RequestHandler, response, Response } from 'express';
import { param, validationResult } from 'express-validator';
import Url from '../../models/api/v1/url.model';
import { jsonResponse } from '../../models/common/response.model';

export class AppController {
  public static root(req: Request, res: Response) {
    res.send('<h1>URL Shortener</h1><h5>v1.0.0</h5>');
  }

  public static redirect(): RequestHandler[] {
    const validation = param('id').isLength({ min: 4, max: 8 });
    return [validation, this.redirectHandler];
  }

  private static async redirectHandler(req: Request, res: Response) {
    const errors = validationResult(req).array();
    if (errors.length > 0) {
      res.sendStatus(404);
    } else {
      const identifier = req.params.id;
      let urlObj = await Url.findOne({ identifier });
      if (urlObj) {
        res.status(302).redirect(urlObj.url);
      } else {
        res.sendStatus(404);
      }
    }
  }
}
