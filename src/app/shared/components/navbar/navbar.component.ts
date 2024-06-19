import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/orders/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input()
  title: string = '';

  constructor(private router: Router, private cartService: CartService) {}

  itemsInCart: number | undefined;

  cartLengthSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.cartLengthSubscription = this.cartService
      .cartLength()
      .subscribe((length) => {
        this.itemsInCart = length;
      });
  }

  ngOnDestroy(): void {
    this.cartLengthSubscription?.unsubscribe();
  }
  createNewProduct() {
    this.router.navigate(['products', 'newProduct']);
  }

  viewAllProducts() {
    this.router.navigate(['products', 'admin']);
  }

  listAllOrders() {
    this.router.navigate(['orders', 'all']);
  }
}
