import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtConfig } from 'src/common/config/jwt.config';
import { ConfigNames } from 'src/common/types/configNames';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

export interface IGeneratedTokens {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class TokenService {
  private readonly _config: JwtConfig;
  constructor(
    private readonly _prisma: PrismaService,
    private readonly _jwtService: JwtService,
    private readonly _configService: ConfigService,
  ) {
    const config = this._configService.getOrThrow<JwtConfig>(ConfigNames.JWT);
    this._config = config;
  }

  public generateTokens(payload: User): IGeneratedTokens {
    const accessToken = this._jwtService.sign(
      { ...payload },
      {
        secret: this._config.accessTokenSecret,
        expiresIn: this._config.accessTokenLife,
      },
    );
    const refreshToken = this._jwtService.sign(
      {
        ...payload,
      },
      {
        secret: this._config.refreshTokenSecret,
        expiresIn: this._config.refreshTokenLife,
      },
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  public validateAccessToken(token: string): User | null {
    const userData = this._validateToken(token, this._config.accessTokenSecret);
    return userData;
  }

  public async validateRefreshToken(
    refreshToken: string,
  ): Promise<User | null> {
    const dbToken = await this._prisma.token.findUnique({
      where: { refreshToken },
    });

    if (!dbToken) {
      return null;
    }

    const userData = this._validateToken(
      refreshToken,
      this._config.refreshTokenSecret,
    );

    return userData;
  }

  private _validateToken(token: string, secret: string): User | null {
    try {
      const userData = this._jwtService.verify(token, {
        secret,
      });

      return userData;
    } catch (e) {
      return null;
    }
  }

  async saveRefreshToken(user: User, refreshToken: string) {
    return this._prisma.token.upsert({
      create: { refreshToken, userId: user.id },
      update: { refreshToken, userId: user.id },
      where: { userId: user.id },
    });
  }

  async removeRefreshToken(refreshToken: string) {
    return this._prisma.token.update({
      data: { refreshToken: null },
      where: { refreshToken },
    });
  }
}
