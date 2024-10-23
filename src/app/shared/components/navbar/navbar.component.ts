import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/orders/cart.service';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton, MatIconAnchor } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatBadge } from '@angular/material/badge';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    standalone: true,
    imports: [
        MatToolbar,
        MatIconButton,
        MatIcon,
        MatIconAnchor,
        RouterLink,
        MatBadge,
        MatMenuTrigger,
        MatMenu,
        MatMenuItem,
    ],
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
