import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CustomerService } from "src/app/services/customer.service";
import { Customers } from "src/app/models/customers";
import { Subscription } from "rxjs";
import { ToastService } from "src/app/shared/toast/toast.service";

@Component({
  selector: "app-customers-edit",
  templateUrl: "./customers-edit.component.html",
  styleUrls: ["./customers-edit.component.scss"]
})
export class CustomersEditComponent implements OnInit, OnDestroy {
  title: string;
  customerForm: FormGroup;
  private sub: Subscription;
  CustomerDetails: Customers;
  errorMessage: any;
  genders = ["male", "female"];
  StatesData: any[];
  ButtonName: string;
  disableDelete: boolean;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      firstName: ["", [Validators.required]],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      gender: ["", Validators.required],
      address: ["", Validators.required],
      city: ["", Validators.required],
      state: ["", Validators.required]
    });
    this.getStates();
    // Read the customer Id from the route parameter
    this.sub = this.route.paramMap.subscribe(params => {
      const id = +params.get("id");
      this.getCustomer(id);
    });
  }

  getStates() {
    this.customerService.getAllStates().subscribe(result => {
      this.StatesData = result;
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
      this.ButtonName = "Save";
      this.disableDelete = true;
    } else {
      (this.title = `${this.CustomerDetails.firstName} ${this.CustomerDetails.lastName}`),
        (this.ButtonName = "Update");
      this.disableDelete = false;
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

  deleteCustomer(): void {
    if (this.CustomerDetails.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (
        confirm(
          `Really delete the customer: ${this.CustomerDetails.firstName} ${this.CustomerDetails.lastName}?`
        )
      ) {
        this.customerService.deleteCustomer(this.CustomerDetails.id).subscribe(
          result => {
            this.onSaveComplete();
            this.toastService.showSuccess("Deleted Successfully");
          },
          error => {
            (this.errorMessage = error), this.toastService.showError(error);
          }
        );
      }
    }
  }

  saveCustomerForm(): void {
    if (this.customerForm.valid) {
      if (this.customerForm.dirty) {
        const p = { ...this.CustomerDetails, ...this.customerForm.value };
        if (p.id === 0) {
          this.customerService.saveCustomer(p).subscribe(
            result => {
              this.onSaveComplete();
              this.toastService.showSuccess(
                "New Customer Created Successfully"
              );
            },
            error => {
              (this.errorMessage = error), this.toastService.showError(error);
            }
          );
        } else {
          this.customerService.updateCustomer(p).subscribe(
            result => {
              this.onSaveComplete();
              this.toastService.showSuccess("Customer Updated Successfully");
            },
            error => {
              (this.errorMessage = error), this.toastService.showError(error);
            }
          );
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = "Please correct the validation errors.";
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.customerForm.reset();
    this.router.navigate(["/customers"]);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
