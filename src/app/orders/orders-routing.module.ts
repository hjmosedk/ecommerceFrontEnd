import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartListComponent } from './cart-list/cart-list.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { cartGuard } from './cart.guard';
import { CurrentOrderComponent } from './current-order/current-order.component';
import { ListOrdersComponent } from './list-orders/list-orders.component';

const ordersRoutes: Routes = [
  {
    path: '',
    component: CreateOrderComponent,
    canActivate: [cartGuard],
  },
  { path: 'cart', component: CartListComponent },
  { path: 'completed', component: CurrentOrderComponent },
  { path: 'current', component: CurrentOrderComponent },
  { path: 'all', component: ListOrdersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(ordersRoutes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
