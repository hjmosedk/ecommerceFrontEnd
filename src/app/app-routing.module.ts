import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './product/all-products/all-products.component';
import { ProductComponent } from './product/product/product.component';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { CartListComponent } from './orders/cart-list/cart-list.component';
import { CreateOrderComponent } from './orders/create-order/create-order.component';
import { cartGuard } from './orders/cart.guard';

const routes: Routes = [
  { path: '', component: AllProductsComponent },
  {
    path: 'products',
    loadChildren: () =>
      import('./product/products-routing.module').then(
        (m) => m.ProductsRoutingModule
      ),
  },
  //{ path: 'products/admin', component: ProductListComponent },
  //{ path: 'product/:id', component: ProductComponent },
  //{ path: 'newProduct', component: CreateProductComponent },
  { path: 'cart', component: CartListComponent, canActivate: [cartGuard] },
  { path: 'order', component: CreateOrderComponent, canActivate: [cartGuard] },
  { path: '**', component: AllProductsComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'always' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
