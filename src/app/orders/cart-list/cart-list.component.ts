import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Observable, Subscription } from 'rxjs';
import { CartItemModel } from '../models/cartItem.model';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/message/message.service';
import {
  DialogResult,
  MessageData,
  MessageType,
} from 'src/app/message/models/message.model';
import { MatButton } from '@angular/material/button';
import { CartItemCardComponent } from '../cart-item-card/cart-item-card.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-cart-list',
    templateUrl: './cart-list.component.html',
    styleUrl: './cart-list.component.css',
    standalone: true,
    imports: [
        MatButton,
        CartItemCardComponent,
        AsyncPipe,
    ],
})
export class CartListComponent implements OnInit, OnDestroy {
  constructor(
    private cartService: CartService,
    private router: Router,
    private messageService: MessageService
  ) {}

  test: any;
  cartLength: number = 0;
  cartLengthSubscription: Subscription = new Subscription();
  cartContent: Observable<CartItemModel[]> | undefined = undefined;

  goBack(): void {
    this.router.navigate(['/']);
  }

  onCancel() {
    const message: MessageData = {
      title: 'Clear Cart',
      type: MessageType.warning,
      messageText: 'This action wil clear the cart are you sure?',
    };

    const dialogRef = this.messageService.sendSystemMessage(message);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === DialogResult.ok) {
        this.cartService.clearCart();
      } else {
        return;
      }
    });
  }

  onConfirm() {
    this.router.navigate(['orders']);
  }

  ngOnInit(): void {
    this.cartLengthSubscription = this.cartService
      .cartLength()
      .subscribe((length) => (this.cartLength = length));

    this.cartContent = this.cartService.cartContent();
  }

  ngOnDestroy(): void {
    this.cartLengthSubscription.unsubscribe();
  }
}
