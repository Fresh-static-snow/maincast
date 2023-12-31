import { BadRequestException, Injectable } from '@nestjs/common';
import { AppConfig } from 'src/common/config/app.config';
import {
  compareStringWithHash,
  generateHashFromString,
} from 'src/common/utils/hash';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './auth.dto';
import { ConfigService } from '@nestjs/config';
import { ConfigNames } from 'src/common/types/configNames';
import { TokenService } from '../token/token.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  private readonly _appConfig: AppConfig;
  constructor(
    private readonly _prisma: PrismaService,
    private readonly _configService: ConfigService,
    private readonly _tokensService: TokenService,
  ) {
    const config = this._configService.getOrThrow<AppConfig>(ConfigNames.APP);
    this._appConfig = config;
  }

  async register({ email, password }: AuthDto) {
    const isExistUser = await this._prisma.user.findUnique({
      where: { email },
    });

    if (isExistUser) {
      throw new BadRequestException('Email already in use.');
    }

    const hashedPassword = await generateHashFromString(
      password,
      this._appConfig.bcryptSalt,
    );

    const createdUser = await this._prisma.user.create({
      data: { email, password: hashedPassword },
    });

    const tokens = this._tokensService.generateTokens(createdUser);

    await this._tokensService.saveRefreshToken(
      createdUser,
      tokens.refreshToken,
    );

    return {
      user: createdUser,
      tokens,
    };
  }

  async login({ email, password }: AuthDto) {
    const candidate = await this._prisma.user.findUnique({
      where: { email },
    });
    if (!candidate) {
      throw new BadRequestException('Invalid email');
    }

    const isValid = await compareStringWithHash(password, candidate.password);

    if (!isValid) {
      throw new BadRequestException('Invalid password');
    }

    const tokens = this._tokensService.generateTokens(candidate);

    await this._tokensService.saveRefreshToken(candidate, tokens.refreshToken);

    return {
      user: candidate,
      tokens,
    };
  }

  async refresh(user: User) {
    const tokens = this._tokensService.generateTokens(user);

    return { tokens };
  }

  async logout(refreshToken: string) {
    await this._tokensService.removeRefreshToken(refreshToken);
  }
}
