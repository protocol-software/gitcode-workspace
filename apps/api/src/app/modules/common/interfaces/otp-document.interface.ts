import { Document } from 'mongoose';
import * as Data from "@re-code-io/data";

export interface IOtp extends Data.IOtp, Document {
  createdDate?: Date;
  updatedDate?: Date;
}
