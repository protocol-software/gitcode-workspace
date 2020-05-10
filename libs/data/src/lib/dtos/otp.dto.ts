import { ApiProperty } from '@nestjs/swagger';

export class OtpDto {
  identity: string;
  code?: string;

  subject?: string;
  bodyHtml?: string;
}
