import create from "./http-service";
export interface Category {
    
     _id: string; 
     name: string; 
  }
export default create("/categories");