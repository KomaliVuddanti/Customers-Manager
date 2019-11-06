import { Component, OnInit } from "@angular/core";
import { CustomerService } from "src/app/services/customer.service";
import { Customers } from "src/app/models/customers";

@Component({
  selector: "app-customers",
  templateUrl: "./customers.component.html",
  styleUrls: ["./customers.component.scss"]
})
export class CustomersComponent implements OnInit {
  allCustomers: Customers[];
  displayMode: DisplayModeEnum;
  displayModeEnum = DisplayModeEnum;
  filteredCustomers: Customers[];

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.displayMode = DisplayModeEnum.Card;
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.customerService.getAllCustomers().subscribe(result => {
      this.allCustomers = result;
      this.filteredCustomers = result;
    });
  }

  changeDisplayMode(mode: DisplayModeEnum) {
    this.displayMode = mode;
  }

  customersFilter(filterBy?: string): void {
    if (filterBy) {
      this.filteredCustomers = this.allCustomers.filter(
        (customer: Customers) =>
        customer.firstName.toLowerCase().indexOf(filterBy.toLowerCase()) !== -1
      );
    } else {
      this.filteredCustomers = this.allCustomers;
    }
  }
}

enum DisplayModeEnum {
  Card = 0,
  List = 1
}



