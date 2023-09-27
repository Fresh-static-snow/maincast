import { Injectable } from '@nestjs/common';
import { Store } from '@prisma/client';
import { storeSeed } from './store.data';
import { PrismaInterface, SeedInterface } from 'src/common/types/interfaces';

@Injectable()
export class StoreSeed implements SeedInterface {
  private readonly _list: Store[] = storeSeed;

  async plant(prisma: PrismaInterface) {
    return await this._fill(prisma);
  }

  private async _fill(prisma: PrismaInterface) {
    return await Promise.all(
      this._list.map(async (store) => {
        const isExists = await prisma.store.findUnique({
          where: { id: store.id },
        });

        if (!isExists) {
          await prisma.store.create({ data: store });
        }
      }),
    );
  }
}
