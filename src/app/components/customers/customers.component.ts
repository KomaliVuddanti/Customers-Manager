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

  customersFilter(term: string) {
    if (!term) {
      this.filteredCustomers = this.allCustomers;
    } else {
      this.filteredCustomers = this.allCustomers.filter(
        x =>
          x.firstName.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
          x.lastName.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
          x.address.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
          x.state.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
          x.gender.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
          x.city.toLowerCase().indexOf(term.toLowerCase()) > -1
      );
    }
  }
}

enum DisplayModeEnum {
  Card = 0,
  List = 1
}
