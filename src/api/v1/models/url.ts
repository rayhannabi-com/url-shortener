import mongoose, { Document, Schema } from 'mongoose'

export interface Url {
  identifier: string
  url: string
  shortUrl: string
  createdAt: Date
  hitCount: number
}

export interface UrlModel extends Url, Document {}

const UrlSchema: Schema = new Schema({
  identifier: { type: String, required: true, unique: true },
  url: { type: String, required: true },
  shortUrl: { type: String, required: true },
  createdAt: { type: Date, required: true },
  hitCount: { type: Number, required: true }
})

UrlSchema.methods.toJSON = function () {
  var obj = this.toObject()
  delete obj._id
  delete obj.__v
  return obj
}

export const Urls = mongoose.model<UrlModel>('URL', UrlSchema)
