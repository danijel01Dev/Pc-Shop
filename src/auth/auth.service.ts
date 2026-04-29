import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private db: UsersService) {}
  // ===== Register user With Token ====

  async register(dto: CreateUserDto) {
    try {
      const userExisting = await this.db.findByEmail(dto.email);
      if (userExisting) {
        throw new HttpException('User already exists', 409);
      }
      const createUser = await this.db.createUser({
        email: dto.email,
        password: dto.password,
      });
      const payload = {
        sub: createUser.id,
        email: createUser.email,
        role: createUser.role,
      };
      const accessToken = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: '15m',
      });
      const refreshToken = jwt.sign(
        payload,
        process.env.JWT_REFRESH_SECRET as string,
        { expiresIn: '7d' },
      );
      const hashToken = await bcrypt.hash(refreshToken, 10);
      const saveToken = await this.db.updateRefreshToken(
        createUser.id,
        hashToken,
      );
      return {
        saveToken,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      console.log('failed to register ', error);
      throw new UnauthorizedException(' register failed');
    }
  }
  //==== Log In user and get token =====
  async login(email: string, password: string) {
    try {
      const userExisting = await this.db.findByEmail(email);
      if (!userExisting) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const passwordCheck = await bcrypt.compare(
        password,
        userExisting.password,
      );
      if (!passwordCheck) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const payload = {
        sub: userExisting.id,
        email: userExisting.email,
        role: userExisting.role,
      };
      const accessToken = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: '15m',
      });
      const refreshToken = jwt.sign(
        payload,
        process.env.JWT_REFRESH_SECRET as string,
        { expiresIn: '7d' },
      );
      const hashToken = await bcrypt.hash(refreshToken, 10);
      await this.db.updateRefreshToken(userExisting.id, hashToken);
      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      console.log('login failed ', error);
      throw new UnauthorizedException('login failed ');
    }
  }

  // ==== Verify token from frontend and update with new one in data base =====
  async refresh(refreshToken: string) {
  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET as string,
    ) as jwt.JwtPayload
    const userId = Number(decoded.sub)

    const user = await this.db.findOne(userId);

    if (!user || !user.refreshToken) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passCheck = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );

    if (!passCheck) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      { expiresIn: '15m' },
    );

    const newRefreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET as string,
      { expiresIn: '7d' },
    );

    const hashToken = await bcrypt.hash(newRefreshToken, 10);
    await this.db.updateRefreshToken(user.id, hashToken);

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  } catch (error) {
    console.log('Refresh token error:', error);
    throw new UnauthorizedException('Invalid or expired refresh token');
  }
}
  //==== Remove token and  Log out User ====
  async logout(data: { sub: number; email: string; role: string }) {
    const user = await this.db.findOne(data.sub);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    await this.db.updateRefreshToken(user.id, '' as string);

    return {
      message: 'Logout successful',
    };
  }
}
