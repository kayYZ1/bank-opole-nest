import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(dto: SignInDto): Promise<any> {
    const user = await this.userService.findByEmail(dto.email);

    if (user?.password !== dto.password) {
      throw new UnauthorizedException();
    }

    const payload = {
      subscriber: user.id,
      email: user.email,
      user: user.username,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
