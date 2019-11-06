import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CustomersComponent } from './components/customers/customers.component';
import { CustomersEditComponent } from './components/customers-edit/customers-edit.component';
import { CustomerEditGuard } from './guard/customer-edit.guard';

const routes: Routes = [
  {
    path: "customers",
    component: CustomersComponent
  },
  {
    path: 'customers/:id/edit',
    canDeactivate: [CustomerEditGuard],
    component: CustomersEditComponent
  },
  { path: "", redirectTo: "customers", pathMatch: "full" },
  { path: '**', redirectTo: 'customers', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
