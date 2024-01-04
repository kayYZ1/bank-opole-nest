import { Controller, UseGuards, Body, Req, Post } from '@nestjs/common';
import { CreditCardService } from './credit-card.service';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { IssueCardDto } from './dto/issue-card.dto';
import { Request } from 'express';

@Controller('credit-card')
export class CreditCardController {
  constructor(private readonly creditCardService: CreditCardService) {}

  @UseGuards(AccessTokenGuard)
  @Post('/issue')
  issueCard(@Body() dto: IssueCardDto, @Req() req: Request) {
    const userId = req.user['subscriber'];
    return this.creditCardService.issueCard(dto, userId);
  }
}
