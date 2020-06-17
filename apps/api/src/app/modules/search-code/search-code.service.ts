import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {CodeQueryDto, ICodeContentItem, ICodeSuggestQuery} from "@gitcode/data";

@Injectable()
export class SearchCodeService {
  constructor(
    // @InjectModel('Otp') private readonly otpModel: Model<IOtp>,
  ) {

  }

  public async getSuggestQuery(codeQuery: CodeQueryDto): Promise<ICodeSuggestQuery[]> {
    const tags: CodeQueryDto[] = [
      { query: 'Angular' },
      { query: 'Angular' },
      { query: 'Angular' },
      { query: 'Angular' },
      { query: 'Angular' },
      { query: 'Angular' },
      { query: 'Angular' },
      { query: 'Angular' },
      { query: 'Angular' },
      { query: 'Angular' },
    ];

    return tags;
  }

  public async query(codeQuery: CodeQueryDto): Promise<ICodeContentItem[]> {
    const contents: ICodeContentItem[] = [
      { title: '', snippet: '', thumbUp: 0, thumbDown: 0, tags: ['Angular']},
      { title: '', snippet: '', thumbUp: 0, thumbDown: 0, tags: ['Angular']},
      { title: '', snippet: '', thumbUp: 0, thumbDown: 0, tags: ['Angular']},
      { title: '', snippet: '', thumbUp: 0, thumbDown: 0, tags: ['Angular']},
      { title: '', snippet: '', thumbUp: 0, thumbDown: 0, tags: ['Angular']},
      { title: '', snippet: '', thumbUp: 0, thumbDown: 0, tags: ['Angular']},
      { title: '', snippet: '', thumbUp: 0, thumbDown: 0, tags: ['Angular']},
      { title: '', snippet: '', thumbUp: 0, thumbDown: 0, tags: ['Angular']},
      { title: '', snippet: '', thumbUp: 0, thumbDown: 0, tags: ['Angular']},
      { title: '', snippet: '', thumbUp: 0, thumbDown: 0, tags: ['Angular']},
      { title: '', snippet: '', thumbUp: 0, thumbDown: 0, tags: ['Angular']},
    ];

    return contents;
  }

}
