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
import { OrdersEffect } from './state/orders.effects';
import { environment } from 'src/environments/environment';
//Material Modules
import { MatStepperModule } from '@angular/material/stepper';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { AddressInformationComponent } from './address-information/address-information.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { CurrentOrderComponent } from './current-order/current-order.component';
import { StatusStepperComponent } from './status-stepper/status-stepper.component';
import { ListOrdersComponent } from './list-orders/list-orders.component';
import { ordersReducer } from './state/orders.reducers';
import { OrderEffect } from './state/order.effects';

import { NgxStripeModule } from 'ngx-stripe';

@NgModule({
  declarations: [
    CartListComponent,
    CartItemCardComponent,
    CreateOrderComponent,
    PersonalInformationComponent,
    AddressInformationComponent,
    CurrentOrderComponent,
    StatusStepperComponent,
    ListOrdersComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatStepperModule,
    OrdersRoutingModule,
    EffectsModule.forFeature([OrdersEffect, OrderEffect]),
    StoreModule.forFeature('cart', cartReducer),
    StoreModule.forFeature('order', orderReducer),
    StoreModule.forFeature('orders', ordersReducer),
    NgxStripeModule.forRoot(environment.stripe_key),
  ],
})
export class OrdersModule {}
