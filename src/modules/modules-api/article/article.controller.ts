import { Controller, Get, Headers, Param, Query, Req } from '@nestjs/common';
import { ArticleService } from './article.service';
import { QueryArticleDto } from './dto/query-article.dto';
import { User } from 'src/common/decorator/user.decorator';
import type { Users } from 'generated/prisma';
import { SkipPermission } from 'src/common/decorator/skip-permission.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { MessageResonse } from 'src/common/decorator/message-response.decorator';
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  // http://localhost:3000/api/article/
  @Get('')
  @SkipPermission()
  @MessageResonse('Get Article Success')
  @ApiBearerAuth()
  findAll(
    @Query()
    query: QueryArticleDto,
    @Param() param,
    @Headers() Headers,
    @Req() req,
    @User()
    user: Users,
  ) {
    console.log('user: ', user);
    return this.articleService.findAll(query);
  }
}
