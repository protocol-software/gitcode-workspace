import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchCodeController } from './search-code.controller';
import { SearchCodeService } from './search-code.service';

@Module({
  imports: [
    MongooseModule.forFeature([
        // { name: 'Otp', schema: OtpSchema }
    ]),
  ],
  controllers: [SearchCodeController],
  providers: [SearchCodeService],
})
export class SearchCodeModule {}
