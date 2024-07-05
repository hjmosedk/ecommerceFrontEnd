import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './shared/components/landing-page/landing-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
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
  { path: '**', component: LandingPageComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'always' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
