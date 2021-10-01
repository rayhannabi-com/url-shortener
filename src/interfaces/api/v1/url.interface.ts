import { Date, Document } from 'mongoose';

export interface IUrl extends Document {
  identifier: string;
  url: string;
  shortUrl: string;
  createdAt: Date;
  hitCount: number;
}
