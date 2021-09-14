import { nanoid } from 'nanoid';
import { IUrl } from '../../interfaces/url';
import Url from '../../models/url';

const nanoidLength = 8;

export class Shortener {
  private url: string;
  constructor(url: string) {
    this.url = url;
  }

  public create(): IUrl {
    const identifier = nanoid(nanoidLength);
    const shortUrl = this.createShortUrl(identifier);
    return new Url({
      identifier,
      url: this.url,
      shortUrl,
      createdAt: new Date(),
      hitCount: 0
    });
  }

  private createShortUrl(identifier: string): string {
    const host = process.env.HOST || 'localhost';
    const port = process.env.PORT || '4000';
    var baseUrl = process.env.BASE_URL || `http://${host}:${port}`;

    if (!baseUrl.endsWith('/')) {
      baseUrl = baseUrl.trim() + '/';
    }
    if (!(baseUrl.startsWith('http://') || baseUrl.startsWith('https://'))) {
      baseUrl = 'https://' + baseUrl;
    }
    return `${baseUrl}${identifier}`;
  }
}
