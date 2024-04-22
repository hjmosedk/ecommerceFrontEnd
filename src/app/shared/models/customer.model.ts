import { Ecommerce } from 'ckh-typings';

export class PersonalInformationModel
  implements Ecommerce.PersonalInformationModel
{
  constructor(
    public firstName: string = '',
    public lastName: string = '',
    public email: string = '',
    public phone: string = '',
    public middleName?: string
  ) {}
}

export class AddressModel implements Ecommerce.AddressModel {
  constructor(
    public address: string = '',
    public address2nd?: string,
    public city: string = '',
    public country: string = '',
    public zipCode: string = ''
  ) {}
}

export class CustomerModel implements Ecommerce.CustomerModel {
  constructor(
    public personalInformation: PersonalInformationModel,
    public shippingAddress: AddressModel,
    public billingAddress: AddressModel
  ) {}
}
