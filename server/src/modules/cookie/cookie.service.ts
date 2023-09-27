import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { CookieConfig } from 'src/common/config/cookie.config';
import { ConfigNames } from 'src/common/types/configNames';

@Injectable()
export class CookieService {
  private readonly _config: CookieConfig;

  constructor(private readonly _configService: ConfigService) {
    const config = this._configService.getOrThrow<CookieConfig>(
      ConfigNames.COOKIES,
    );
    this._config = config;
  }

  setCookie(res: Response, refreshToken: string) {
    return res.cookie(this._config.refreshCookieName, refreshToken, {
      maxAge: this._config.refreshCookieLife,
      httpOnly: true,
      secure: true,
    });
  }

  removeCookie(res: Response) {
    return res.clearCookie(this._config.refreshCookieName);
  }
}
