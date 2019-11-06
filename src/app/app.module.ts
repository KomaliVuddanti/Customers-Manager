import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomerService } from './services/customer.service';
import { CustomersEditComponent } from './components/customers-edit/customers-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    CustomersEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxPaginationModule,
    ToastrModule.forRoot({ preventDuplicates: true }),
    AppRoutingModule
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
