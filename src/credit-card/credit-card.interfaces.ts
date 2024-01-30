import { Provider } from './credit-card.enum';

export interface IPrefix {
  provider: Provider;
  min: number;
  max: number;
}
