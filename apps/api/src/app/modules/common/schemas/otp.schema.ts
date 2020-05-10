import * as mongoose from 'mongoose';

export const OtpSchema = new mongoose.Schema({
  identity: { type: mongoose.Schema.Types.String },
  code: { type: mongoose.Schema.Types.String, unique: true },
  expiration: { type: Date, default: Date.now },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
});
