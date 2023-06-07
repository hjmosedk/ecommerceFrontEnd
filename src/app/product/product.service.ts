import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, NewProduct } from 'src/app/product/types/productTypes';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUri = environment.baseUri;
  constructor(private http: HttpClient) {}

  /*
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
*/
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUri}/products`);
    //.pipe(catchError(this.handleError));
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUri}/products/${id}`);
    //.pipe(catchError(this.handleError));
  }

  createProduct(product: NewProduct): Observable<Product> {
    return this.http.post<Product>(`${this.baseUri}/products`, product);
    //.pipe(catchError(this.handleError));
  }

  uploadImage(image: any): void {
    this.http.post(`${this.baseUri}/images/upload`, image);
  }
}
