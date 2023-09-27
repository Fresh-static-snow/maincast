import { Injectable } from '@nestjs/common';
import { userSeed } from './auth.data';
import { User } from '@prisma/client';
import { PrismaInterface, SeedInterface } from 'src/common/types/interfaces';

@Injectable()
export class AuthSeed implements SeedInterface {
  private readonly _list: User[] = userSeed;

  async plant(prisma: PrismaInterface) {
    await this._fill(prisma);
  }

  private async _fill(prisma: PrismaInterface) {
    await Promise.all(
      this._list.map(async (user) => {
        const isExists = await prisma.user.findUnique({
          where: { id: user.id },
        });

        if (!isExists) {
          await prisma.user.create({ data: user });
        }
      }),
    );
  }
}
