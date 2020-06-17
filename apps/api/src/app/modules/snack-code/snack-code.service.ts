import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {CodeTagDto, ICodeContentItem, ICodeTag} from "@gitcode/data";

@Injectable()
export class SnackCodeService {
  constructor(
    // @InjectModel('Otp') private readonly otpModel: Model<IOtp>,
  ) {

  }

  public async getTags(): Promise<any> {
    const tags: ICodeTag[] = [
      { tagName: 'Angular', categoryType: 'Framework', count: 10 },
      { tagName: 'AngularJS', categoryType: 'Framework', count: 10 },
      { tagName: 'Angular 2+', categoryType: 'Framework', count: 10 },
      { tagName: 'Angular 9', categoryType: 'Framework', count: 10 },
      { tagName: 'React', categoryType: 'Library', count: 10 },
      { tagName: 'VueJS', categoryType: 'Library', count: 10 },

      { tagName: 'Typescript', categoryType: 'Language', count: 10 },
      { tagName: 'Javascript', categoryType: 'Language', count: 10 },

      { tagName: 'MongoDB', categoryType: 'Database', count: 10 },
      { tagName: 'ElasticSearch', categoryType: 'Database', count: 10 },

      { tagName: 'Git', categoryType: 'Tool', count: 10 },
    ];

    return tags;
  }

  public async getContents(codeTag: [CodeTagDto]): Promise<ICodeContentItem[]> {
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
