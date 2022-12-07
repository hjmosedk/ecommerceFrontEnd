import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/types/productTypes';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.log('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned an error ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something went wrong, Please try again later')
    );
  }

  getAllProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>('http://192.168.1.90:3000/products')
      .pipe(catchError(this.handleError));
  }
}
