import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PersonalInformationModel } from 'src/app/shared/models/customer.model';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.css',
})
export class PersonalInformationComponent implements OnInit {
  @Input() personalInformation = new PersonalInformationModel();

  @Output() formValueChange = new EventEmitter<PersonalInformationModel>();

  personalInformationForm = this.formBuilder.group({
    firstName: [
      this.personalInformation.firstName || '',
      [Validators.required],
    ],
    lastName: [this.personalInformation.lastName || '', [Validators.required]],
    email: [
      this.personalInformation.email || '',
      [Validators.required, Validators.email],
    ],
    phone: [this.personalInformation.phone || '', [Validators.required]],
    middleName: [this.personalInformation.middleName || '', []],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.personalInformationForm.valueChanges.subscribe((value) => {
      const newPersonalInformation: PersonalInformationModel = {
        firstName: value.firstName || '',
        lastName: value.lastName || '',
        email: value.email || '',
        phone: value.phone || '',
        middleName: value.middleName || '',
      };
      this.formValueChange.emit(newPersonalInformation);
    });
  }
}
