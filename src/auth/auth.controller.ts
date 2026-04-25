import { Controller, Post, Body, Req, UseGuards, Delete } from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtRefreshGuard } from './jwt/JWT-Guards/jwt.guard.refreshToken';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthResponseDto } from './AuthDTO/auth-response.dto';
import { ApiErrorResponses } from 'src/error-decorator/ErrorDecoratorSwagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './AuthDTO/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @ApiOperation({ summary: 'User Register' })
  @ApiResponse({
    status: 200,
    description: 'User created successfully',
    type: AuthResponseDto,
  })
  @ApiErrorResponses()
  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.auth.register(dto);
  }
  @ApiOperation({ summary: 'User Log In' })
  @ApiResponse({
    status: 200,
    description: 'User Log In successfull',
    type: AuthResponseDto,
  })
  @ApiErrorResponses()
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto.email, dto.password);
  }
  @ApiOperation({ summary: 'Refresh/verify Token' })
  @ApiResponse({
    status: 200,
    description: 'Token has been refreshed ',
    type: AuthResponseDto,
  })
  @ApiErrorResponses()
  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  refresh(@Req() req) {
    return this.auth.refresh(req.user);
  }
  @ApiOperation({ summary: 'Remove token/access to user' })
  @ApiResponse({ status: 200, description: 'User successfully logged out' })
  @ApiErrorResponses()
  @Delete('logout')
  @UseGuards(JwtRefreshGuard)
  logout(@Req() req) {
    return this.auth.logout(req.user);
  }
}
