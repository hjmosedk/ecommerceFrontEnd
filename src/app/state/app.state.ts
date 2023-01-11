import { Product } from '../product/types/productTypes';

export interface AppState {
  products: Products;
}

export interface Products {
  product: Product | {};
  productList: Product[] | [];
}
