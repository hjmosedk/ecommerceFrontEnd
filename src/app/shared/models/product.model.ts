export enum CurrencyEnum {
  DKK = 'DKK',
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
}

export type DineroModel = Dinero.Dinero;

export interface ProductModel {
  id: string;
  name: string;
  sku: string;
  description: string;
  price: number;
  currency: CurrencyEnum;
  image: string;
  quantity: number;
  category: string;
  percentage: number;
  onSale: boolean;
  isPublic: boolean;
}

export type NewProductModel = Omit<ProductModel, 'id'>;
