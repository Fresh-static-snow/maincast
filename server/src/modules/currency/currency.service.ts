import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CurrencyService {
  constructor(private _prisma: PrismaService) {}

  async get(take = 10, skip = 0) {
    return this._prisma.currency.findMany({
      take,
      skip,
    });
  }
}
