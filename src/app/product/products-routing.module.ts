import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './all-products/all-products.component';
import { ProductComponent } from './product/product.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductListComponent } from './product-list/product-list.component';

const productsRoutes: Routes = [
  { path: '', component: AllProductsComponent },
  { path: 'newProduct', component: CreateProductComponent },
  { path: 'admin', component: ProductListComponent },
  { path: ':id', component: ProductComponent },
];

@NgModule({
  imports: [RouterModule.forChild(productsRoutes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
