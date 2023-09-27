import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CardCreateDto, CardDeleteDto } from './card.dto';

@Injectable()
export class CardService {
  private readonly defaultCardAmount = 0;
  constructor(private _prisma: PrismaService) {}

  async create(dto: CardCreateDto, userId: number) {
    return this._prisma.card.create({
      data: {
        ...dto,
        amount: this.defaultCardAmount,
        data: Buffer.from('hello', 'utf-8'),
        userId,
      },
    });
  }

  async get(userId: number, take = 10, skip = 0) {
    return this._prisma.card.findMany({
      where: {
        userId,
      },
      take,
      skip,
    });
  }

  async delete({ id }: CardDeleteDto, userId: number) {
    return this._prisma.card.delete({
      where: {
        id,
        userId,
      },
    });
  }
}
