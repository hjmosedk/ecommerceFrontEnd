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
