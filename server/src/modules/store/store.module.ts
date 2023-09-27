import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { StoreSeed } from './seeds/store.seed';

@Module({
  imports: [],
  controllers: [StoreController],
  providers: [StoreService, StoreSeed],
  exports: [StoreSeed],
})
export class StoreModule {}
