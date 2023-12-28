export interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
  result: number;
  defaultPrice: number;
}

export interface NewProduct {
  id: number;
  name: string;
  defaultPrice: number;
}
