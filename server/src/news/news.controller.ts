import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsCategory } from './enum/news-category.enum';
import { SearchNewsDTO } from './dto/search-news.dto';

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

  @Post('search-news')
  @HttpCode(HttpStatus.OK)
  async searchNews(@Body(ValidationPipe) searchNewsDto: SearchNewsDTO) {
    return this.newsService.getSearchNews(searchNewsDto.searchString);
  }
}
