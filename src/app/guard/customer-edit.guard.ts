import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomersEditComponent } from '../components/customers-edit/customers-edit.component';

@Injectable({
  providedIn: 'root'
})
export class CustomerEditGuard implements CanDeactivate<CustomersEditComponent> {
  canDeactivate(component: CustomersEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.customerForm.dirty) {
      const customerName = component.customerForm.get('firstName').value  || 'New Customer';
      return confirm(`Navigate away and lose all changes to ${customerName}?`);
    }
    return true;
  }
}
