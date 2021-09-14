import { Request, RequestHandler, Response } from 'express';
import { body, param, query, validationResult } from 'express-validator';
import { Shortener } from '.';
import { JSONResponse } from '../../../../models/response';
import Url from '../../models/url';

export class UrlsController {
  public static listAll(): RequestHandler {
    return (req: Request, res: Response) => {
      res.json(JSONResponse.from(200));
    };
  }

  public static create(): RequestHandler[] {
    const validations = body('url')
      .isURL()
      .withMessage('A valid url is required');

    const handler = async (req: Request, res: Response) => {
      const errors = validationResult(req).array();
      if (errors.length > 0) {
        res.status(400).json(JSONResponse.from(400, null, errors));
      } else {
        let url = await Url.findOne({ url: req.body.url });
        if (url) {
          res.json(JSONResponse.from(200, url));
        } else {
          try {
            url = new Shortener(req.body.url).create();
            await url.save();
            res.json(JSONResponse.from(200, url));
          } catch (err) {
            res.status(500).json(JSONResponse.from(500, null, err));
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
        res.status(400).json(JSONResponse.from(400, null, errors));
      } else {
        try {
          const identifier = req.params.id;
          let url = await Url.findOne({ identifier });
          if (url) {
            res.json(JSONResponse.from(200, url));
          } else {
            res
              .status(404)
              .json(
                JSONResponse.from(404, null, { message: 'Item not found' })
              );
          }
        } catch (err) {
          res.status(500).json(JSONResponse.from(500, null, err));
        }
      }
    };

    return [validation, handler];
  }
}
