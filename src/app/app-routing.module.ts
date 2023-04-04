import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './product/all-products/all-products.component';
import { ProductComponent } from './product/product/product.component';
import { CreateProductComponent } from './product/create-product/create-product.component';

const routes: Routes = [
  { path: '', component: AllProductsComponent },
  { path: 'products', component: AllProductsComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'newProduct', component: CreateProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
