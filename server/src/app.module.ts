import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './common/config/app.config';
import { StoreModule } from './modules/store/store.module';
import { CardModule } from './modules/card/card.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { ApplicationSeedModule } from './modules/application_seed/application_seed.module';
import { CookieModule } from './modules/cookie/cookie.module';
import cookieConfig from './common/config/cookie.config';
import jwtConfig from './common/config/jwt.config';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, cookieConfig, jwtConfig],
      isGlobal: true,
    }),
    AuthModule,
    StoreModule,
    CardModule,
    TransactionsModule,
    ApplicationSeedModule,
    CookieModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
