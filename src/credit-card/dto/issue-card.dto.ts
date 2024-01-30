import { IsEnum } from 'class-validator';
import { CardType, Provider } from '../credit-card.enum';

export class IssueCardDto {
  @IsEnum(Provider)
  provider: Provider;

  @IsEnum(CardType)
  type: CardType;
}
