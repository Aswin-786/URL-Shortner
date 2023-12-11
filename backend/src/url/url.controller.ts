import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { UrlService } from './url.service';

@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('url')
  async shortenUrl(
    @Body('originalURL') originalURL: string,
  ): Promise<{ shortURL: string }> {
    const shortURL = await this.urlService.createShortURL(originalURL);
    return { shortURL };
  }

  @Get(':shortURL')
  async redirect(
    @Param('shortURL') shortURL: string,
    @Res() res,
  ): Promise<void> {
    try {
      const originalURL = await this.urlService.redirectToOriginalURL(shortURL);
      res.redirect(HttpStatus.MOVED_PERMANENTLY, originalURL);
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(HttpStatus.NOT_FOUND).send('Short URL not found');
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Server Error');
      }
    }
  }
}
