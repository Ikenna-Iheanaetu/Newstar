import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsCategory } from './enum/news-category.enum';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('breaking-news')
  @HttpCode(HttpStatus.OK)
  getFeaturedNews() {
    return this.newsService.getFeaturedNews();
  }

  @Get('category/:category')
  @HttpCode(HttpStatus.OK)
  getNewsInCategory(@Param('category') category: NewsCategory) {
    return this.newsService.getNewsInCategory(category);
  }
}
