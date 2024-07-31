import create from "./http-service";
export interface Product {
  _id: string;
  name: string;
  quantity: number;
  price: number;
  result: number;
  defaultPrice: number;
  numberInStock: number;
  category: { _id: string; name: string };
}

export interface NewProduct {
  //_id: string;
  name: string;
  defaultPrice: number;
  numberInStock: number;
  //category: { _id: string; name: string };
  categoryId: string;
  // categoryName: string;
}

export interface NewInvoiceProduct {
  productID: string;
  quantity: number;
  price: number;
  //category: { _id: string; name: string };
  total: number;
  // categoryName: string;
}
export default create("/products");
