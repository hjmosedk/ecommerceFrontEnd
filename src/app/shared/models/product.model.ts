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

export class PersonalInformationModel {
  constructor(
    public firstName: string = '',
    public lastName: string = '',
    public email: string = '',
    public phone: number = 0,
    public middleName?: string
  ) {}
}

export class AddressModel {
  constructor(
    public address: string = '',
    public address2nd?: string,
    public city: string = '',
    public country: string = '',
    public zipCode: string = ''
  ) {}
}

export class CustomerModel {
  constructor(
    public personalInformation: PersonalInformationModel,
    public shippingAddress: AddressModel,
    public billingAddress: AddressModel
  ) {}
}
