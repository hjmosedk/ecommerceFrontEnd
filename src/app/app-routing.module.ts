import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './product/all-products/all-products.component';

const routes: Routes = [
  { path: '', component: AllProductsComponent },
  {
    path: 'products',
    loadChildren: () =>
      import('./product/products-routing.module').then(
        (m) => m.ProductsRoutingModule
      ),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./orders/orders-routing.module').then(
        (m) => m.OrdersRoutingModule
      ),
  },
  { path: '**', component: AllProductsComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'always' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
