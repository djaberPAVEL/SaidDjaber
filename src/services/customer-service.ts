import create from "./http-service";
export interface Customer {
    
     _id: string; 
     name: string; 
     isGold:Boolean; 
     phone:string;
  }
export default create("/customers");