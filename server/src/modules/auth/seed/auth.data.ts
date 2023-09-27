import { User } from '@prisma/client';
import { RoleAccess } from 'src/common/types/enums';

export const userSeed: User[] = [
  {
    id: 1,
    email: 'example@mail.com',
    accessLevel: RoleAccess.ADMIN,
    password: '$2b$04$s/uFo6q1IV.n5yX1lSGNbu238JjmJ2nmvFAwz0LPpiwmgCpIebPGW',
  },
];
