import { Injectable } from '@nestjs/common';
import { currencySeed } from './currency.data';
import { Currency } from '@prisma/client';
import { PrismaInterface, SeedInterface } from 'src/common/types/interfaces';

@Injectable()
export class CurrencySeed implements SeedInterface {
  private readonly _list: Currency[] = currencySeed;

  async plant(prisma: PrismaInterface) {
    await this._fill(prisma);
  }

  private async _fill(prisma: PrismaInterface) {
    await Promise.all(
      this._list.map(async (currency) => {
        const isExists = await prisma.currency.findUnique({
          where: { id: currency.id },
        });

        if (!isExists) {
          await prisma.currency.create({ data: currency });
        }
      }),
    );
  }
}
