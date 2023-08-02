import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel, NewProductModel } from '../shared/models/product.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUri = environment.baseUri;
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`${this.baseUri}/products`);
    //.pipe(catchError(this.handleError));
  }

  getProduct(id: number): Observable<ProductModel> {
    return this.http.get<ProductModel>(`${this.baseUri}/products/${id}`);
    //.pipe(catchError(this.handleError));
  }

  createProduct(product: NewProductModel): Observable<ProductModel> {
    return this.http.post<ProductModel>(`${this.baseUri}/products`, product);
    //.pipe(catchError(this.handleError));
  }

  uploadImage(image: any): void {
    this.http.post(`${this.baseUri}/images/upload`, image);
  }
}
