import { Role } from 'src/enums/roles.enum';

interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface JwtResponse {
  userId: number;
  email: string;
  username: string;
  role: Role;
}

export interface IUserState {
  id: number;
  fullName: string;
  username: string;
  email: string;
  age: number;
  gender: string;
  role: Role;
  tokens: ITokens;
}
