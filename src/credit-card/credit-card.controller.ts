import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { Role } from '../auth/auth.enum';
import { ROLES } from '../auth/decorators/roles.decorator';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreditCardService } from './credit-card.service';
import { IssueCardDto } from './dto/issue-card.dto';
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

  @UseGuards(AccessTokenGuard, RolesGuard)
  @ROLES(Role.Admin)
  removeCard(@Param('id') id: string) {
    return this.creditCardService.removeCard(+id);
  }
}
