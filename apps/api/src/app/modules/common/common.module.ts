import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';
import { OtpSchema } from './schemas/otp.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Otp', schema: OtpSchema }]),
  ],
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule {}
