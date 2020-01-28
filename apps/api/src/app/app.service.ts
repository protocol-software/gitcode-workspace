import { Injectable } from '@nestjs/common';
import { IMessage } from '@re-code-io/data';

@Injectable()
export class AppService {
  getData(): IMessage {
    return { message: 'Welcome to api!' };
  }
}
