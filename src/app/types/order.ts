import { Sizes } from './sneaker';

export type Order = {
  size: Sizes[];
  cartedItem: {
    brand: string;
    model: string;
    size: Sizes[];
    price: number;
    onSalePrice: number;
    onSale: boolean;
    stock: number;
    gender: string;
    id: string;
  };
  cartedBy: {
    name: string;
    surname: string;
    email: string;
    role: string;
    id: string;
  };
  amount: number;
  orderId: string;
};

export type ProtoOrder = {
  size: Sizes;
  cartedItem: string;
  cartedBy: string;
};
