import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { AppConfig } from 'src/common/config/app.config';
import { ConfigNames } from 'src/common/types/configNames';
import { StoreSeed } from '../store/seeds/store.seed';
import { CurrencySeed } from '../currency/seeds/currency.seed';
import { AuthSeed } from '../auth/seed/auth.seed';

@Injectable()
export class ApplicationSeedService {
  private readonly _logger = new Logger(ApplicationSeedService.name);
  constructor(
    private readonly _configService: ConfigService,
    private readonly _prisma: PrismaService,

    private readonly _currencySeed: CurrencySeed,
    private readonly _storeSeed: StoreSeed,
    private readonly _userSeed: AuthSeed,
  ) {}

  async plant() {
    const config = this._configService.get<AppConfig>(ConfigNames.APP);

    if (config?.isDev) {
      await this._plantDev();
    }
  }

  private async _plantDev() {
    try {
      await this._prisma.$transaction(async (prisma) => {
        await this._storeSeed.plant(prisma);
        await this._currencySeed.plant(prisma);
        await this._userSeed.plant(prisma);
      });
    } catch (error) {
      this._logger.error(error);
    }
  }
}
