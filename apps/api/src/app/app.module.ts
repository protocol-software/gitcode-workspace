import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CommonModule } from './modules/common/common.module';
import { environment } from '../environments/environment';
import {SnackCodeModule} from './modules/snack-code/snack-code.module';
import {SearchCodeModule} from './modules/search-code/search-code.module';
import {GithubModule} from "./modules/github/github.module";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => (
          {
            uri: environment.database.uri,
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useUnifiedTopology: true,
          }
      ),
    }),
      CommonModule,
      SnackCodeModule,
      SearchCodeModule,
      GithubModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
