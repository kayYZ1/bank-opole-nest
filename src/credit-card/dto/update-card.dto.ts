import { IsEnum } from 'class-validator';
import { CardStatus } from '../credit-card.enum';

export class UpdateCardDto {
  @IsEnum(CardStatus)
  cardStatus: CardStatus;
}
