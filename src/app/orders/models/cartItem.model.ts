import { Ecommerce } from 'ckh-typings';

export class CartItemModel implements Ecommerce.OrderItemModel {
  constructor(
    public name: string,
    public id: number,
    public sku: string,
    public description: string,
    public price: number,
    public image: string,
    public salesQuantity: number,
    public currency: Ecommerce.CurrencyType,
    public productId: number,
    public product: Ecommerce.ProductModel
  ) {}
}
