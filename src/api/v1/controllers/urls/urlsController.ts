import { Request, RequestHandler, Response } from 'express'
import { body, param, validationResult } from 'express-validator'
import { jsonResponse } from '../../../../common/models'
import { ShortUrl } from '../../../../utils/shortUrl'
import { Urls } from '../../models/url'

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
      param('id').isLength({ min: 8, max: 8 }).isAscii(),
      this.findHandler
    ]
  }

  public static update(): RequestHandler[] {
    return [
      param('id').isLength({ min: 8, max: 8 }).isAscii(),
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

    try {
      const url = await Urls.findOne({ url: req.body.url })
      if (url) {
        jsonResponse().data(url).send(res)
      } else {
        const newUrl = await Urls.create(new ShortUrl(req.body.url).create())
        jsonResponse(201).data(newUrl).send(res)
      }
    } catch (err) {
      jsonResponse(500).error(err).send(res)
    }
  }

  private static async findHandler(req: Request, res: Response) {
    const errors = validationResult(req).array()
    if (errors.length > 0) {
      jsonResponse(404).error({ message: 'Item not found' }).send(res)
      return
    }

    try {
      const url = await Urls.findOne({ identifier: req.params.id })
      if (url) {
        jsonResponse().data(url).send(res)
      } else {
        jsonResponse(404).error({ message: 'Item not found' }).send(res)
      }
    } catch (err) {
      jsonResponse(500).error(err).send(res)
    }
  }

  private static async updateHandler(req: Request, res: Response) {
    const errors = validationResult(req).array()
    if (errors.length > 0) {
      if (errors.map((value) => value.param).includes('id')) {
        jsonResponse(404).error({ message: 'Item not found' }).send(res)
      } else {
        jsonResponse(400).error(errors).send(res)
      }
      return
    }
    try {
      const url = await Urls.findOneAndUpdate(
        { identifier: req.params.id },
        { hitCount: req.body.hitCount },
        { new: true }
      )
      if (url) {
        jsonResponse().data(url).send(res)
      } else {
        jsonResponse(404).error({ message: 'Item not found' }).send(res)
      }
    } catch (err) {
      jsonResponse(500).error(err).send(res)
    }
  }
}
