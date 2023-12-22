import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(dto: SignUpDto): Promise<any> {
    const userExists = await this.userService.findByEmail(dto.email);
    if (userExists) {
      throw new BadRequestException('User with that e-mail already exists.');
    }

    const hash = await this.hashData(dto.password);
    const user = await this.userService.createUser({
      ...dto,
      password: hash,
    });

    const tokens = await this.getTokens(user.id, user.email, user.username);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async signIn(dto: SignInDto): Promise<any> {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) {
      throw new BadRequestException('User with that email does not exist.');
    }
    const passwordMatch = await argon2.verify(user.password, dto.password);
    if (!passwordMatch) {
      throw new BadRequestException('Password is incorrect.');
    }

    const tokens = await this.getTokens(user.id, user.email, user.username);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async signOut(userId: number) {
    return this.userService.updateUser(userId, { refreshToken: null });
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashRefreshToken = await this.hashData(refreshToken);
    await this.userService.updateUser(+userId, {
      refreshToken: hashRefreshToken,
    });
  }

  async getTokens(userId: number, email: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          subscriber: userId,
          email,
          username,
        },
        {
          secret: jwtConstants.access_secret,
          expiresIn: '30m',
        },
      ),
      this.jwtService.signAsync(
        {
          subscriber: userId,
          email,
          username,
        },
        {
          secret: jwtConstants.refresh_secret,
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
