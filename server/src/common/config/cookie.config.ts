import { registerAs } from '@nestjs/config';
import { ConfigNames } from '../types/configNames';
import { accessLifeMultiplier, refreshLifeMultiplier } from '../constants/jwt';
import { DAY, HOUR } from '../constants/time';

export interface CookieConfig {
  accessCookieName: string;
  refreshCookieName: string;
  accessCookieLife: number;
  refreshCookieLife: number;
}

export default registerAs(ConfigNames.COOKIES, () => {
  const config: CookieConfig = {
    accessCookieName: 'accessToken',
    refreshCookieName: 'refreshToken',
    accessCookieLife: accessLifeMultiplier * HOUR,
    refreshCookieLife: refreshLifeMultiplier * DAY,
  };

  return config;
});
