import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Req,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

import { AuthGuard } from './auth.guard';
import { SignUpDto } from './dto/sign-up.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }

  @Post('register')
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  @Get('logout')
  signOut(@Req() req: Request) {
    this.authService.signOut(req.user['subscriber']);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
