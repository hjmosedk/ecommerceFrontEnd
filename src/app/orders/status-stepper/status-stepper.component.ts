import { Component, Input } from '@angular/core';
import { Ecommerce } from 'ckh-typings';

@Component({
  selector: 'app-status-stepper',
  templateUrl: './status-stepper.component.html',
  styleUrl: './status-stepper.component.css',
})
export class StatusStepperComponent {
  @Input() orderStatus: Ecommerce.OrderStatus | undefined;
  orderStatusArray: string[] = Object.values(Ecommerce.OrderStatus);
  stepperLabel: string[] = this.orderStatusArray.map((status) =>
    this.capitalize(status)
  );

  stepperIcons: string[] = [
    'inbox',
    'event',
    'done',
    'local_shipping',
    'flight',
    'done_all',
  ];

  capitalize(orderStatus: string) {
    const lowerCaseStatus = orderStatus.toLowerCase();
    return lowerCaseStatus.charAt(0).toUpperCase() + lowerCaseStatus.slice(1);
  }

  getCurrentStep(orderStatus: Ecommerce.OrderStatus) {
    const apiStatus = this.capitalize(orderStatus);
    return this.stepperLabel.indexOf(apiStatus);
  }
}
