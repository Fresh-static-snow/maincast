import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtConfig } from '../config/jwt.config';
import { ConfigNames } from '../types/configNames';
import { refreshStrategyName } from '../constants/jwt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  refreshStrategyName,
) {
  constructor(configService: ConfigService) {
    const config = configService.get<JwtConfig>(ConfigNames.JWT);
    if (!config) {
      throw new Error('JWT config does not exists');
    }
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          return req?.cookies?.refreshToken;
        },
      ]),
      secretOrKey: config.refreshTokenSecret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
