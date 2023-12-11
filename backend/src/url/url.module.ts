import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { MongooseModule } from '@nestjs/mongoose';
import { URLSchema } from './schemas/url.schemas';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'URL', schema: URLSchema }])],
  controllers: [UrlController],
  providers: [UrlService],
})
export class UrlModule {}
