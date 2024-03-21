import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { cartReducer } from './state/reducer';
import { CartListComponent } from './cart-list/cart-list.component';
import { SharedModule } from '../shared/shared.module';
import { CartItemCardComponent } from './cart-item-card/cart-item-card.component';
import { CreateOrderComponent } from './create-order/create-order.component';

//Material Modules
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
  declarations: [
    CartListComponent,
    CartItemCardComponent,
    CreateOrderComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatStepperModule,
    StoreModule.forFeature('cart', cartReducer),
  ],
})
export class OrdersModule {}
