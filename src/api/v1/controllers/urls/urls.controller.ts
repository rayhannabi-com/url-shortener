import { Request, RequestHandler, Response } from 'express'
import { body, param, validationResult } from 'express-validator'
import { jsonResponse } from '../../../../common/models/response.model'
import { Shortener } from '../../../../utils/shortener'
import Url from '../../models/url.model'

export class UrlsController {
  public static create(): RequestHandler[] {
    return [
      body('url')
        .notEmpty()
        .withMessage("'url' is missing")
        .isURL()
        .withMessage('Valid URL required'),
      this.createHandler
    ]
  }

  public static find(): RequestHandler[] {
    return [
      param('id').isLength({ min: 4, max: 8 }).isAscii(),
      this.findHandler
    ]
  }

  public static update(): RequestHandler[] {
    return [
      param('id').isLength({ min: 4, max: 8 }).isAscii(),
      body('hitCount')
        .notEmpty()
        .withMessage("'hitCount' is missing")
        .isInt({ min: 0 })
        .withMessage('hit count must be a positive integer'),
      this.updateHandler
    ]
  }

  private static async createHandler(req: Request, res: Response) {
    const errors = validationResult(req).array()
    if (errors.length > 0) {
      jsonResponse(400).error(errors).send(res)
      return
    }

    const createIfNotFound = (url: any) => {
      if (url) {
        jsonResponse().body(url).send(res)
        return
      }
      return new Shortener(req.body.url).create().save()
    }

    Url.findOne({ url: req.body.url })
      .then(createIfNotFound)
      .then((url) => jsonResponse(201).body(url).send(res))
      .catch((err) => jsonResponse(500).error(err).send(res))
  }

  private static async findHandler(req: Request, res: Response) {
    const errors = validationResult(req).array()
    if (errors.length > 0) {
      jsonResponse(400).error(errors).send(res)
      return
    }

    Url.findOne({ identifier: req.params.id })
      .then((url) => jsonResponse().body(url).send(res))
      .catch((err) => jsonResponse(500).error(err).send(res))
  }

  private static updateHandler(req: Request, res: Response) {
    const errors = validationResult(req).array()
    if (errors.length > 0) {
      jsonResponse(400).error(errors).send(res)
      return
    }

    Url.findOneAndUpdate(
      { identifier: req.params.id },
      { hitCount: req.body.hitCount },
      { new: true }
    )
      .then((url) => jsonResponse(200).body(url).send(res))
      .catch((err) => jsonResponse(500).error(err).send(res))
  }
}
