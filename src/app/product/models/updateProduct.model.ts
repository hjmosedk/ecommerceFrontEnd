import { Ecommerce } from 'ckh-typings';

export interface UpdateProductModel {
  product: Ecommerce.ProductModel;
  uri: string;
  onUpdatedProduct: any;
  imgString: string;
}

type updateFunction = (args: any) => void;
