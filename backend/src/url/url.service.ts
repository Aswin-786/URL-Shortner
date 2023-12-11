import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { URL } from './schemas/url.schemas';
import { nanoid } from 'nanoid';

@Injectable()
export class UrlService {
  constructor(@InjectModel('URL') private readonly urlModel: Model<URL>) {}

  //creating short url
  async createShortURL(originalURL: string): Promise<string> {
    //checking the url
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/i;
    if (!urlPattern.test(originalURL)) {
      throw new Error('Enter a valid URL');
    }

    const existingURL = await this.urlModel.findOne({ originalURL }).exec();
    if (existingURL) {
      return existingURL.shortURL;
    } else {
      //using nanoid
      const urlId = nanoid(8);
      const base = `http://localhost:9000`;
      const shortURL = `${base}/${urlId}`;

      const newURL = new this.urlModel({ originalURL, shortURL });
      await newURL.save();
      return shortURL;
    }
  }

  //redirect the url
  async redirectToOriginalURL(shortURL: string): Promise<string> {
    const base = `http://localhost:9000`;
    const url = `${base}/${shortURL}`;
    const existingURL = await this.urlModel.findOne({ shortURL: url }).exec();
    if (!existingURL) {
      throw new NotFoundException('Short URL not found');
    }
    return existingURL.originalURL;
  }
}
