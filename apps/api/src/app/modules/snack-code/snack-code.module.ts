import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SnackCodeController } from './snack-code.controller';
import { SnackCodeService } from './snack-code.service';

@Module({
  imports: [
    MongooseModule.forFeature([
        // { name: 'Otp', schema: OtpSchema }
    ]),
  ],
  controllers: [SnackCodeController],
  providers: [SnackCodeService],
})
export class SnackCodeModule {}
