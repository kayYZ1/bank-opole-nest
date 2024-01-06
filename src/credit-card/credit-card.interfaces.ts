import { Provider } from "src/enums/credit-card.enum";

export interface IPrefix {
  provider: Provider;
  min: number;
  max: number;
}
