import { Role } from 'src/user/user.interface';

export interface JwtResponse {
  userId: number;
  email: string;
  username: string;
  role: Role;
}
