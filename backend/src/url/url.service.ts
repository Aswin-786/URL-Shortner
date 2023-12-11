import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { URL } from './schemas/url.schemas';
import { nanoid } from 'nanoid';
import { log } from 'console';

@Injectable()
export class UrlService {
  constructor(@InjectModel('URL') private readonly urlModel: Model<URL>) {}

  async createShortURL(originalURL: string): Promise<string> {
    const existingURL = await this.urlModel.findOne({ originalURL }).exec();
    if (existingURL) {
      return existingURL.shortURL;
    } else {
      const urlId = nanoid(8);
      const base = `http://localhost:9000`;
      const shortURL = `${base}/${urlId}`;
      console.log(shortURL);

      const newURL = new this.urlModel({ originalURL, shortURL });
      await newURL.save();
      return shortURL;
    }
  }

  async redirectToOriginalURL(shortURL: string): Promise<string> {
    console.log(shortURL);
    const base = `http://localhost:9000`;
    const url = `${base}/${shortURL}`;

    const existingURL = await this.urlModel.findOne({ shortURL: url }).exec();
    if (!existingURL) {
      throw new NotFoundException('Short URL not found');
    }
    return existingURL.originalURL;
  }
}
