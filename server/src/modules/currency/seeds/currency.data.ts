import { Currency } from '@prisma/client';

export const currencySeed: Currency[] = [
  {
    id: 'f42fb981-711b-45bf-9ee0-63cd80278602',
    name: 'Bonus points',
    symbol: null,
  },
  {
    id: 'b338c51c-103f-41ab-9e68-be7e2aaf6908',
    name: 'Euro',
    symbol: '€',
  },
  {
    id: 'bebe7ba7-8809-47e5-bf07-bf1e1b485342',
    name: 'Dollar',
    symbol: '$',
  },
];
