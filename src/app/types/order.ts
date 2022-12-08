import { Sizes, Sneaker } from './sneaker';
import { User } from './user';

export type Order = {
  size: Sizes[];
  cartedItem: Sneaker;
  cartedBy: User;
  orderId: string;
  amount: number;
};

export type ProtoOrder = {
  size: Sizes;
  amount: number;
};
