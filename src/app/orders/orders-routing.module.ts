import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartListComponent } from './cart-list/cart-list.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { cartGuard } from './cart.guard';

const ordersRoutes: Routes = [
  { path: '', component: CartListComponent },
  {
    path: 'order',
    component: CreateOrderComponent,
    canActivate: [cartGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ordersRoutes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
