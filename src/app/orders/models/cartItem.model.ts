import { CurrencyEnum } from 'src/app/shared/models/product.model';

export class CartItemModel {
  constructor(
    public name: string,
    public id: string,
    public sku: string,
    public description: string,
    public price: number,
    public image: string,
    public salesQuantity: number,
    public currency: CurrencyEnum
  ) {}
}
