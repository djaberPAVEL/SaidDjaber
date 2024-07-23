export interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
  result: number;
  defaultPrice: number;
  numberInStock:number;
  category:{id:string, name:string};
  
}

export interface NewProduct {
  id: number;
  name: string;
  defaultPrice: number;
  numberInStock:number,
  //category:{id:string, name:string};
  categoryId:string;
  categoryName: string;
  
}
