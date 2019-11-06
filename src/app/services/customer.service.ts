import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable, of } from "rxjs";
import { Customers } from "../models/customers";
import { catchError } from "rxjs/operators";

@Injectable()
export class CustomerService {
  private url = environment.serviceUrl;
  private stateUrl = environment.statesUrl;

  constructor(private http: HttpClient) {}

  getAllStates(): Observable<any[]> {
    const url = `${this.stateUrl}`;
    return this.http.get<any[]>(url).pipe(catchError(this.handleError));
  }

  getAllCustomers(): Observable<Customers[]> {
    const url = `${this.url}`;
    return this.http.get<Customers[]>(url).pipe(catchError(this.handleError));
  }

  getCustomer(id: number): Observable<Customers> {
    if (id === 0) {
      return of(this.initializeCustomer());
    } else {
      const url = `${this.url}/${id}`;
      return this.http.get<Customers>(url).pipe(catchError(this.handleError));
    }
  }

  saveCustomer(formObject: Customers): Observable<Customers> {
    const url = `${this.url}`;
    return this.http
      .post<Customers>(url, formObject)
      .pipe(catchError(this.handleError));
  }

  updateCustomer(formObject: Customers): Observable<Customers> {
    const url = `${this.url}/${formObject.id}`;
    return this.http
      .put<Customers>(url, formObject)
      .pipe(catchError(this.handleError));
  }

  deleteCustomer(id: number): Observable<Customers> {
    const url = `${this.url}/${id}`;
    return this.http.delete<Customers>(url).pipe(catchError(this.handleError));
  }

  private initializeCustomer(): Customers {
    // Return an initialized object
    return {
      id: 0,
      firstName: null,
      lastName: null,
      gender: null,
      email: null,
      address: null,
      city: null,
      state: null
    };
  }

  private handleError(error: HttpErrorResponse) {
    console.error("server error:", error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return Observable.throw(errMessage);
      // Use the following instead if using lite-server
      // return Observable.throw(err.text() || 'backend server error');
    }
    return Observable.throw(error);
  }
}
