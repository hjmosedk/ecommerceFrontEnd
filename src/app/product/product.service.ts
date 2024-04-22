import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewProductModel } from '../shared/models/product.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ecommerce } from 'ckh-typings';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUri = environment.baseUri;
  constructor(private http: HttpClient) {}

  private _selectedProduct!: Ecommerce.ProductModel;

  public get selectedProduct() {
    return this._selectedProduct;
  }

  public set selectedProduct(product: Ecommerce.ProductModel) {
    this._selectedProduct = product;
  }

  getAllProducts(): Observable<Ecommerce.ProductModel[]> {
    return this.http.get<Ecommerce.ProductModel[]>(
      `${this.baseUri}/products/all`
    );
    //.pipe(catchError(this.handleError));
  }

  getProduct(id: number): Observable<Ecommerce.ProductModel> {
    return this.http.get<Ecommerce.ProductModel>(
      `${this.baseUri}/products/${id}`
    );
    //.pipe(catchError(this.handleError));
  }

  createProduct(product: NewProductModel): Observable<Ecommerce.ProductModel> {
    return this.http.post<Ecommerce.ProductModel>(
      `${this.baseUri}/products`,
      product
    );
    //.pipe(catchError(this.handleError));
  }

  uploadImage(image: any): void {
    this.http.post(`${this.baseUri}/images/upload`, image);
  }

  updateProduct(
    product: Ecommerce.ProductModel
  ): Observable<Ecommerce.ProductModel> {
    const { id } = product;
    return this.http.patch<Ecommerce.ProductModel>(
      `${this.baseUri}/products/${id}`,
      product
    );
  }

  updateStatus(id: number): Observable<Ecommerce.ProductModel> {
    return this.http.post<Ecommerce.ProductModel>(
      `${this.baseUri}/products/${id}`,
      {}
    );
  }
}
