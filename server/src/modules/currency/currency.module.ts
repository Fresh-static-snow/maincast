import { Module } from '@nestjs/common';
import { CurrencySeed } from './seeds/currency.seed';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';

@Module({
  imports: [],
  controllers: [CurrencyController],
  providers: [CurrencySeed, CurrencyService],
  exports: [CurrencySeed],
})
export class CurrencyModule {}
