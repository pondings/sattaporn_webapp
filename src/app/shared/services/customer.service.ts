import { Customer } from './../models/Customer';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class CustomerService {

  protected url: string = environment.api;
  private customerUrl = this.url + 'customer/';

  constructor(private http: HttpClient) {
  }

  public updateCustomer(customer: Customer): Promise<Customer> {
    const body = JSON.stringify(customer);
    return this.http.put<Customer>(this.customerUrl + 'update', body).toPromise();
  }

  public createCustomer(customer: Customer): Promise<Customer> {
    const body = JSON.stringify(customer);
    return this.http.post<Customer>(this.customerUrl + 'create', body).toPromise();
  }

  public removeCustomer(customer: Customer): Promise<Boolean> {
    return this.http.delete<Boolean>(this.customerUrl + 'remove/' + customer.id).toPromise();
  }

  public findCustomer(customer: Customer): Promise<Customer[]> {
    const body = JSON.stringify(customer);
    return this.http.post<Customer[]>(this.customerUrl + 'find', body).toPromise();
  }

  public findAll(): Promise<Customer[]> {
    const customer: Customer = new Customer();
    customer.findMethod = 'fullName';
    customer.searchKeyword = '';
    const body = JSON.stringify(customer);
    return this.http.post<Customer[]>(this.customerUrl + 'find', body).toPromise();

  }


}
