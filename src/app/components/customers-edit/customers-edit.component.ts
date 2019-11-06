import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { CustomerService } from "src/app/services/customer.service";
import { Customers } from "src/app/models/customers";
import { Subscription } from "rxjs";

@Component({
  selector: "app-customers-edit",
  templateUrl: "./customers-edit.component.html",
  styleUrls: ["./customers-edit.component.scss"]
})
export class CustomersEditComponent implements OnInit {
  title: string;
  customerForm: FormGroup;
  private sub: Subscription;
  CustomerDetails: Customers;
  errorMessage: any;
  genders = ["male", "female"];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.title = "Add Customer";
    this.customerForm = this.fb.group({
      firstName: ["", [Validators.required]],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      gender: ["", Validators.required],
      address: ["", Validators.required],
      city: ["", Validators.required],
      state: ["", Validators.required]
    });

    // Read the customer Id from the route parameter
    this.sub = this.route.paramMap.subscribe(params => {
      const id = +params.get("id");
      console.log(id);
      this.getCustomer(id);
    });
  }

  get formControls() {
    return this.customerForm.controls;
  }

  getCustomer(id: number) {
    this.customerService.getCustomer(id).subscribe(
      (result: Customers) => {
        this.displayCustomer(result);
      },
      error => {
        this.errorMessage = error;
      }
    );
  }

  displayCustomer(customer: Customers): void {
    if (this.customerForm) {
      this.customerForm.reset();
    }
    this.CustomerDetails = customer;
    if (this.CustomerDetails.id === 0) {
      this.title = "Add Customer";
    } else {
      this.title = `${this.CustomerDetails.firstName} ${this.CustomerDetails.lastName}`;
    }

    // Update the data on the form
    this.customerForm.patchValue({
      firstName: this.CustomerDetails.firstName,
      lastName: this.CustomerDetails.lastName,
      email: this.CustomerDetails.email,
      gender: this.CustomerDetails.gender,
      address: this.CustomerDetails.address,
      city: this.CustomerDetails.city,
      state: this.CustomerDetails.state
    });
  }
}
