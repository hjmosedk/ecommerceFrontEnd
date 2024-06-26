import { Component, OnInit, Pipe } from '@angular/core';
import { OrdersService } from '../orders.service';
import { Observable } from 'rxjs';
import { Ecommerce } from 'ckh-typings';
import { Router } from '@angular/router';
import { OrderModel } from 'ckh-typings/dist/ecommerce';
import { MessageService } from 'src/app/message/message.service';
import { MessageType } from 'src/app/message/models/message.model';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrl: './list-orders.component.css',
})
export class ListOrdersComponent implements OnInit {
  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private messageService: MessageService
  ) {}
  allOrders: Observable<Ecommerce.OrderModel[]> =
    this.ordersService.selectAllOrders();

  displayedColumns: string[] = [
    'id',
    'orderDate',
    'lastChange',
    'customer',
    'totalPrice',
    'currency',
    'items',
    'notes',
    'status',
    'view',
    'update',
  ];

  ngOnInit(): void {
    this.ordersService.listAllOrders();
  }

  viewOrder(id: number) {
    this.ordersService.setCurrentOrder(id);
    this.router.navigate(['orders', 'current']);
  }

  updateOrder(order: OrderModel) {
    this.ordersService.setCurrentOrder(order.id);
    this.messageService.sendSystemMessage({
      type: MessageType.update,
      title: `Order: ${order.id}`,
      messageText: '',
    });
    console.log('Order updated');
    console.log('Order data: ', order);
    console.log('Function not implemented!');
  }

  capitalize(orderStatus: string) {
    const lowerCaseStatus = orderStatus.toLowerCase();
    return lowerCaseStatus.charAt(0).toUpperCase() + lowerCaseStatus.slice(1);
  }

  isButtonActive(id: number): boolean {
    let isActive = true;
    this.ordersService.getCurrentOrder().subscribe((order) => {
      if (order?.id === id) {
        isActive = false;
      }
    });
    return isActive;
  }
}
