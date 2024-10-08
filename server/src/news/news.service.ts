import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { ArticlesProps, NewsDataType } from 'src/types/news';

@Injectable()
export class NewsService {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.API_KEY;
  }

  async getFeaturedNews(): Promise<ArticlesProps[]> {
    const url: string = `https://newsapi.org/v2/everything?q=Nigeria&sortBy=popularity&pageSize=5&apiKey=${this.apiKey}`;
    console.log(url);

    try {
      const { data } = await axios.get<NewsDataType>(url);

      return data.articles;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Sorry something went wrong');
    }
  }
}
