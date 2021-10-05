import { nanoid } from 'nanoid'
import { Url } from '../api/v1/models/url'
import urlUtils from './urlUtils'

const nanoidLength = 8

export class ShortUrl {
  private url: string
  constructor(url: string) {
    this.url = urlUtils.sanitizeHttp(url)
  }

  public create(): Url {
    const identifier = nanoid(nanoidLength)
    const shortUrl = this.createShortUrl(identifier)
    return {
      identifier,
      url: this.url,
      shortUrl,
      createdAt: new Date(),
      hitCount: 0
    }
  }

  private createShortUrl(identifier: string): string {
    var baseUrl = urlUtils.baseUrl()
    if (!baseUrl.endsWith('/')) {
      baseUrl = baseUrl.trim() + '/'
    }
    return urlUtils.sanitizeHttp(baseUrl) + identifier
  }
}
