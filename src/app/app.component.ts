import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "./service/customer.service";
import {CustomerDto} from "./dto/CustomerDto";
import {ToastrService} from "ngx-toastr";

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
  customerList:CustomerDto[]=[];
  constructor(private customerService: CustomerService,
              private toastr:ToastrService) {
    this.loadCustomers();
  }

  private loadCustomers() {
    this.customerService.loadAll().subscribe(response=>{
      if (response.code===200){
        this.customerList=response.data.list;
      }
    })
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
        this.viewAlert('success','Customer Saved!');
        this.loadCustomers();
      }, error => {
        console.log(error);
      });
  }
  viewAlert(type:string,message:string){
    if (type==='success'){
      this.toastr.success(message,'Success!',{
        timeOut:5000
      });
    }else if(type==='danger'){
      this.toastr.error(message,'Danger!',{
        timeOut:5000
      });
    }
  }

  deleteCustomer(id: any) {
    if (confirm('Are you sure?')){
      this.customerService.deleteCustomer(id).subscribe(response=>{
        if (response.code==204){
          this.loadCustomers();
          this.viewAlert('danger','Deleted!');
        }
      })
    }

  }

  getCustomer() {
    this.customerService.getCustomer(
      this.customerForm.get('id')?.value
    ).subscribe(response=>{
      if (response.code===200){
        this.customerForm.patchValue({
          name:response.data.name,
          address:response.data.address,
          salary:response.data.salary,
        })
      }
    })
  }
}
