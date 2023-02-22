import { Product } from '../product/types/productTypes';

export interface AppState {
  product: ProductState;
  products: Products;
}

export interface Products {
  productList: Product[] | [];
}

export interface ProductState {
  product: Product | undefined;
}
