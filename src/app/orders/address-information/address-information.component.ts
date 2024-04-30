import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AddressModel } from 'src/app/shared/models/customer.model';

@Component({
  selector: 'app-address-information',
  templateUrl: './address-information.component.html',
  styleUrl: './address-information.component.css',
})
export class AddressInformationComponent implements OnInit, OnDestroy {
  constructor(private formBuilder: FormBuilder) {}
  @Input() isDisabled: boolean = false;
  @Input() displayAddress: AddressModel = new AddressModel();
  @Input() addressInformation = new AddressModel();
  @Input() stepperTitle: string = '';
  addressInformationSubscription: Subscription = new Subscription();

  @Output() formValueChange = new EventEmitter<AddressModel>();

  addressInformationForm = this.formBuilder.group({
    address: [this.addressInformation.address || '', [Validators.required]],
    address2nd: [this.addressInformation.address2nd, []],
    city: [this.addressInformation.city || '', [Validators.required]],
    zipCode: [this.addressInformation.zipCode || '', [Validators.required]],
    country: [this.addressInformation.country || '', [Validators.required]],
  });

  ngOnInit(): void {
    this.addressInformationSubscription =
      this.addressInformationForm.valueChanges.subscribe((value) => {
        const newAddressInformation: AddressModel = {
          address: value.address || '',
          address2nd: value.address2nd || '',
          city: value.city || '',
          zipCode: value.zipCode || '',
          country: value.country || '',
        };
        this.formValueChange.emit(newAddressInformation);
      });
  }

  ngOnDestroy(): void {
    this.addressInformationSubscription.unsubscribe();
  }
}
