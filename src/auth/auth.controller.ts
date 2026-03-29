import { Controller, Post, Body, Req, UseGuards, Delete } from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtRefreshGuard } from './jwt/jwt.guard.refreshToken';

@Controller('auth')
export class AuthController {
    constructor(private auth : AuthService){}


    @Post('register')
    register(@Body() Body){
        return this.auth.register(Body)
    }

    @Post('login')
     login(@Body() Body){
        return this.auth.login( Body.email, Body.password)
     }
    @Post('refresh')
    @UseGuards(JwtRefreshGuard)
    refresh(@Req() req){
        return this.auth.refresh(req.user)
    }

    @Delete('logout')
    @UseGuards(JwtRefreshGuard)
    logout(@Req() req){
        return this.auth.logout(req.user)
    }
}
