import { ProductModel } from 'src/app/shared/models/product.model';

export interface UpdateProductModel {
  product: ProductModel;
  uri: string;
  onUpdatedProduct: any;
  imgString: string;
}

type updateFunction = (args: any) => void;
