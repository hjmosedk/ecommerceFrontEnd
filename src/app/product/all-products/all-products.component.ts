import { Component, Input } from '@angular/core';
import { Product } from 'src/types/productTypes';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent {
  image1 =
    'https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80';
  image2 =
    'https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80';
  image3 =
    'https://images.unsplash.com/photo-1557800634-7bf3c7305596?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2001&q=80';
  image4 =
    'https://images.unsplash.com/photo-1551410224-699683e15636?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80';

  carouselContent = [this.image1, this.image2, this.image3, this.image4];

  allProduct = [
    {
      title: 'Mobile',
      image: 'assets/images/mobile-img.png',
      description: 'This is the description of the product',
      brand: 'Samsung',
      percentage: '70 %',
      price: 999,
      onSale: true,
    },
    {
      title: 'Computer',
      image: 'assets/images/computer-img.png',
      description: 'This is the description of the product',
      brand: 'LG',
      percentage: '70 %',
      price: 9999,
      onSale: false,
    },
    {
      title: 'Camera',
      image: 'assets/images/camera-img.png',
      description: 'This is the description of the product',
      brand: 'LG',
      percentage: '70 %',
      price: 500,
      onSale: true,
    },
  ];
}
