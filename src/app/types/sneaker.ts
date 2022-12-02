export type Sizes =
  | '35.5'
  | '36'
  | '36,5'
  | '37'
  | '37.5'
  | '38'
  | '38.5'
  | '39'
  | '39.5'
  | '40'
  | '40.5'
  | '41'
  | '41.5'
  | '42'
  | '42.5'
  | '43'
  | '43.5'
  | '44'
  | '44.5';

export type Sneaker = {
  id: string;
  brand: string;
  model: string;
  size: Sizes[];
  price: number;
  onSalePrice: number;
  onSale: boolean;
  stock: number;
  gender: string;
};

export type ProtoSneaker = {
  brand: string;
  model: string;
  size: Sizes[];
  price: number;
  onSalePrice: number;
  onSale: boolean;
  stock: number;
  gender: string;
};
