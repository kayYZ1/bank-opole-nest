import { Role } from "src/enums/roles.enum";

export interface JwtResponse {
  userId: number;
  email: string;
  username: string;
  role: Role;
}
