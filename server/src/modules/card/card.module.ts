import { Module } from '@nestjs/common';
import { CardController } from './card.controller';
import { CardService } from './card.service';

@Module({
  imports: [],
  controllers: [CardController],
  providers: [CardService],
  exports: [],
})
export class CardModule {}
