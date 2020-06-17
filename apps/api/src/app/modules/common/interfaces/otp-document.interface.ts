import { Document } from 'mongoose';
import * as Data from "@gitcode/data";

export interface IOtp extends Data.IOtp, Document {
  createdDate?: Date;
  updatedDate?: Date;
}
