import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PersonalInformationModel } from 'src/app/shared/models/customer.model';
import { MatFormField, MatInput } from '@angular/material/input';
import { MatLabel, MatHint, MatError } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatStepperPrevious, MatStepperNext } from '@angular/material/stepper';

@Component({
    selector: 'app-personal-information',
    templateUrl: './personal-information.component.html',
    styleUrl: './personal-information.component.css',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        MatHint,
        MatError,
        MatButton,
        MatStepperPrevious,
        MatStepperNext,
    ],
})
export class PersonalInformationComponent implements OnInit, OnDestroy {
  constructor(private formBuilder: FormBuilder) {}

  @Input() personalInformation = new PersonalInformationModel();

  @Output() formValueChange = new EventEmitter<PersonalInformationModel>();

  personalInformationSubscription: Subscription = new Subscription();

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

  ngOnInit(): void {
    this.personalInformationSubscription =
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

  ngOnDestroy(): void {
    this.personalInformationSubscription.unsubscribe();
  }
}
