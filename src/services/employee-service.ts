import create from "./http-service";
export interface Employee {
    
     id: string; 
     first_name: string; 
     last_name:string; 
     phone:string;
     email:string
     department_name:string
     situa_famil:string
     num_secu_social:number
     job_title:string,
     
  }
export default create("/employee");