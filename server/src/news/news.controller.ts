import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('breaking-news')
  @HttpCode(HttpStatus.OK)
  getFeaturedNews() {
    return this.newsService.getFeaturedNews();
  }
}
