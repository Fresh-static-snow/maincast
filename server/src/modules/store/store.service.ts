import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Store } from '@prisma/client';
import { StoreCreateDto } from './store.dto';

@Injectable()
export class StoreService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ name }: StoreCreateDto): Promise<Store> {
    return this.prisma.store.create({
      data: { name },
    });
  }

  async update({ id, name }: Store): Promise<Store> {
    return this.prisma.store.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  }
}
