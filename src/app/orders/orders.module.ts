import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { cartReducer } from './state/cart.reducer';
import { orderReducer } from './state/order.reducer';
import { CartListComponent } from './cart-list/cart-list.component';
import { SharedModule } from '../shared/shared.module';
import { CartItemCardComponent } from './cart-item-card/cart-item-card.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { EffectsModule } from '@ngrx/effects';
import { OrdersEffect } from './state/order.effects';

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
    EffectsModule.forFeature([OrdersEffect]),
    StoreModule.forFeature('cart', cartReducer),
    StoreModule.forFeature('order', orderReducer),
  ],
})
export class OrdersModule {}
