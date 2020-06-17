import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';

@Module({
  imports: [
    // MongooseModule.forFeature([
    //     // { name: 'Otp', schema: OtpSchema }
    // ]),
  ],
  controllers: [GithubController],
  providers: [GithubService],
})
export class GithubModule {}
