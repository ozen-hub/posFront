import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CustomerDto} from "../dto/CustomerDto";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
url=environment.baseUrl;
  constructor(private http:HttpClient) { }

  saveCustomer(customer:CustomerDto):Observable<any>{
     return  this.http.post<any>(this.url+'customer',
       {
        id:customer.id,
        name:customer.name,
        address:customer.address,
        salary:Number(customer.salary),
      })
  }
  loadAll():Observable<any>{
    return  this.http.get<any>(this.url+'customer/all');
  }
  deleteCustomer(id:any):Observable<any>{
    return  this.http.delete<any>(
      this.url+'customer?id='+id);
  }

  getCustomer(id:any):Observable<any>{
    return  this.http.get<CustomerDto>(
      this.url+'customer/'+id);
  }
  updateCustomer(customer:CustomerDto):Observable<any>{
    return  this.http.put<any>(
      this.url+'customer',
      {
        id:customer.id,
        name:customer.name,
        address:customer.address,
        salary:Number(customer.salary),
      })
  }
}
