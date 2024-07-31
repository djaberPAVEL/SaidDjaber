import { Customer } from "./customer-service";
import create from "./http-service";
import { NewInvoiceProduct, Product } from "./product-service";
export interface Invoice {
    
    _id:string,
    customer:Customer,
    invoiceNumber: string,
    date: Date,
    //invoiceDueDate: string;
    items:Array<Product>;
    totalAmount: number;
    status:string,
 }
 export interface NewInvoice {
    
    
    customerID:Customer["_id"],
    //invoiceDueDate: string;
    items:Array<NewInvoiceProduct>;
    totalAmount: number;
    status:string,
 }
export default create("/invoices");