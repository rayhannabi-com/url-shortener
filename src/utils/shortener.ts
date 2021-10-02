import { nanoid } from 'nanoid';
import { IUrl } from '../api/v1/interfaces/url.interface';
import Url from '../api/v1/models/url.model';

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
