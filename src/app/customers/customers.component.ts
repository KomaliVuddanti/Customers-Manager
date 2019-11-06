import { Component, OnInit } from '@angular/core';
import { Customers } from '../models/customers';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  allCustomers: Customers[];

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.customerService.getAllCustomers().subscribe(result => {
      this.allCustomers = result;
    })
  }

}
