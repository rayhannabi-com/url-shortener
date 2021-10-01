import mongoose, { Schema } from 'mongoose';
import { IUrl } from '../../../interfaces/api/v1/url.interface';

const UrlSchema: Schema = new Schema({
  identifier: { type: String, required: true, unique: true },
  url: { type: String, required: true },
  shortUrl: { type: String, required: true },
  createdAt: { type: Date, required: true },
  hitCount: { type: Number, required: true }
});

UrlSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj._id;
  delete obj.__v;
  return obj;
};

const Url = mongoose.model<IUrl>('URL', UrlSchema);

export default Url;
