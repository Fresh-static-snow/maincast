import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Request } from 'express';

export class MessageResponse<T> {
  @ApiProperty()
  public message: string;

  @ApiProperty()
  public data: T | null;

  constructor(message: string, data?: T) {
    this.message = message;
    this.data = data ?? null;
  }
}

export type GuardedRequest = Request & { user: User };
