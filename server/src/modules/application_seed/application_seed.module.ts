import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { StoreModule } from '../store/store.module';
import { ApplicationSeedService } from './application_seed.service';
import { CurrencyModule } from '../currency/currency.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [StoreModule, CurrencyModule, AuthModule],
  providers: [ApplicationSeedService],
})
export class ApplicationSeedModule implements OnApplicationBootstrap {
  constructor(private readonly _seedService: ApplicationSeedService) {}

  async onApplicationBootstrap() {
    await this._seedService.plant();
  }
}
