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

// class ProductService {
//   getAllProducts() {
//     const controller = new AbortController();
//     const request = apiClient.get<Product[]>("/products", {
//       signal: controller.signal,
//     });
//     return { request, cancel: () => controller.abort() };
//   }
//   deleteProduct(_id:string){
//     return apiClient.delete(`/products/${_id}`);
//   }
//   updateProduct(_id:string,product:NewProduct){
//     return apiClient.put(`/products/${_id}`,product);
//   }
//   createProduct(product:NewProduct){
//     return apiClient.post("/products/",product);
//   }
// }
export default create("/products");
