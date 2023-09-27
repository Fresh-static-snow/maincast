import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TransactionsDto } from './transacttions.dto';
import Decimal from 'decimal.js';

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async addToBalance({ userCardId, amount }: TransactionsDto) {
    return this.prisma.$transaction(async (prisma) => {
      const card = await prisma.card.findUnique({
        where: { id: userCardId },
      });

      if (!card) {
        throw new Error(`Card with id ${userCardId} not found`);
      }

      const currentBalance = new Decimal(card.amount);

      const newBalance = currentBalance.plus(amount);

      return prisma.card.update({
        where: { id: userCardId },
        data: { amount: newBalance },
      });
    });
  }

  async removeFromBalance({ userCardId, amount }: TransactionsDto) {
    return this.prisma.$transaction(async (prisma) => {
      const card = await prisma.card.findUnique({
        where: { id: userCardId },
      });

      if (!card) {
        throw new Error(`Card with id ${userCardId} not found`);
      }

      const currentBalance = new Decimal(card.amount);

      if (currentBalance.lessThan(amount)) {
        throw new Error('Insufficient balance');
      }

      const newBalance = currentBalance.minus(amount);

      return prisma.card.update({
        where: { id: userCardId },
        data: { amount: newBalance },
      });
    });
  }
}
