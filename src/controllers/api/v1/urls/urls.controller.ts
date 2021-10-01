import { Request, RequestHandler, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import { Shortener } from './index.controller';
import { jsonResponse } from '../../../../models/common/response.model';
import Url from '../../../../models/api/v1/url.model';

export class UrlsController {
  public static create(): RequestHandler[] {
    const validations = body('url').isURL().withMessage('Valid URL required');

    const handler = async (req: Request, res: Response) => {
      const errors = validationResult(req).array();
      if (errors.length > 0) {
        jsonResponse(400).error(errors).send(res);
      } else {
        let url = await Url.findOne({ url: req.body.url });
        if (url) {
          jsonResponse().body(url).send(res);
        } else {
          try {
            url = new Shortener(req.body.url).create();
            await url.save();
            jsonResponse().body(url).send(res);
          } catch (err) {
            jsonResponse(500).error(err).send(res);
          }
        }
      }
    };
    return [validations, handler];
  }

  public static async updateHitCount(identifier: string) {
    let url = await Url.findOne({ identifier });
    if (url) {
      url.hitCount += 1;
      await url.save();
    }
  }

  public static find(): RequestHandler[] {
    const validation = param('id').isLength({ min: 4, max: 8 }).isAscii();
    const handler = async (req: Request, res: Response) => {
      const errors = validationResult(req).array();
      if (errors.length > 0) {
        jsonResponse(400).error(errors).send(res);
      } else {
        try {
          const identifier = req.params.id;
          let url = await Url.findOne({ identifier });
          if (url) {
            jsonResponse().body(url).send(res);
          } else {
            jsonResponse(404).error({ message: 'Item not found' }).send(res);
          }
        } catch (err) {
          jsonResponse(500).error(err).send(res);
        }
      }
    };

    return [validation, handler];
  }
}
