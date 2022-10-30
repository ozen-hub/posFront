import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "./service/customer.service";
import {CustomerDto} from "./dto/CustomerDto";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  customerForm= new FormGroup({
    id: new FormControl(null,
      [Validators.required,
        Validators.maxLength(5), Validators.minLength(3)]),
    name: new FormControl(null,
      [Validators.required,
        Validators.maxLength(15), Validators.minLength(3)]),
    address: new FormControl(null,
      [Validators.required,
        Validators.maxLength(45), Validators.minLength(5)]),
    salary: new FormControl(null, Validators.required)
  });

  constructor(private customerService: CustomerService) {
  }

  saveCustomer(){
    let dto= new CustomerDto(
      this.customerForm.get('id')?.value,
      this.customerForm.get('name')?.value,
      this.customerForm.get('address')?.value,
      this.customerForm.get('salary')?.value
    );
    this.customerService.saveCustomer(dto)
      .subscribe(response=>{
        console.log(response)
      }, error => {
        console.log(error);
      });

  }
}
