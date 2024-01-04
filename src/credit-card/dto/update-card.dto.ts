import { IsEnum } from 'class-validator';
import { CardStatus } from 'src/enums/credit-card.enum';

export class UpdateCardDto {
  @IsEnum(CardStatus)
  cardStatus: CardStatus;
}
