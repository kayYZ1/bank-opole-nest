import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class transferMoneyDto {
  @IsInt()
  receiverId: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsInt()
  @Min(1, { message: 'Minimum amount is 1' })
  @Max(10000, { message: 'Maximum amount is 10.000' })
  amount: string;
}
