import create from "./http-service";
export interface Job {
    
     id: string; 
     title: string; 
     department_id:string; 
     employee_id:string;
     cration_date:Date
     department_name:string;
     employee_first_name:string;
     employee_last_name:string;
  }
export default create("/job");