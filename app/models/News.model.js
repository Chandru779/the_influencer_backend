import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema( {
  info: String,
  source: String,
  sourceLink: String,
  newsStatus: String,
  newsSourceMethod: {
    type: String,
    enum: ["automated", "community"],
    required: true,
  },
  scrapedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const newsModel = mongoose.model('News', newsSchema);