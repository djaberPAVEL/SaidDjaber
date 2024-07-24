import apiClient from "./api-client";

// interface Entity{
//     _id:string;
// }
class httpService {
    endpoint:string;

    constructor(endpoint:string){
        this.endpoint = endpoint;
    }
  getAll<T>() {
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.endpoint, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }
  delete(_id:string){
    return apiClient.delete(this.endpoint +"/"+_id);
  }
  update<T /*extends Entity*/> (_id:string,entity:T){
    return apiClient.put(this.endpoint +"/"+_id,entity);
  }
  create<T>(entity:T){
    return apiClient.post(this.endpoint,entity);
  }
}
const create = (endpoint:string)=>new httpService(endpoint);
export default create;
