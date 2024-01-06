import {
  Controller,
  UseGuards,
  Body,
  Req,
  Post,
  Get,
  Patch,
  Param,
} from '@nestjs/common';
import { CreditCardService } from './credit-card.service';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { IssueCardDto } from './dto/issue-card.dto';
import { Request } from 'express';
import { UpdateCardDto } from './dto/update-card.dto';
@Controller('credit-card')
export class CreditCardController {
  constructor(private readonly creditCardService: CreditCardService) {}

  @UseGuards(AccessTokenGuard)
  @Post('/issue')
  issueCard(@Body() dto: IssueCardDto, @Req() req: Request) {
    const userId = req.user['subscriber'];
    return this.creditCardService.issueCard(dto, userId);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/')
  getAllCards(@Req() req: Request) {
    const userId = req.user['subscriber'];
    return this.creditCardService.getAllCards(userId);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/:id')
  getCard(@Param('id') id: string) {
    return this.creditCardService.getCard(+id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/change-status/:id')
  changeStatus(@Body() dto: UpdateCardDto, @Param('id') id: string) {
    return this.creditCardService.changeStatus(dto, +id);
  }
}
