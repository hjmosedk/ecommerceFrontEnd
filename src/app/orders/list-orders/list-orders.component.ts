import { SettingService } from './../../settings/setting.service';
import { Component, OnInit, Pipe } from '@angular/core';
import { OrderService } from '../order.service';
import { OrdersService } from '../orders.service';
import { Observable } from 'rxjs';
import { Ecommerce } from 'ckh-typings';
import { Router } from '@angular/router';
import { OrderModel } from 'ckh-typings/dist/ecommerce';
import { MessageService } from 'src/app/message/message.service';
import {
  MessageType,
  DialogResult,
} from 'src/app/message/models/message.model';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrl: './list-orders.component.css',
})
export class ListOrdersComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private ordersService: OrdersService,
    private router: Router,
    private messageService: MessageService,
    private settingService: SettingService
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
    console.log('Called');
    console.log(id);
    this.orderService.setCurrentOrder(id);
    this.router.navigate(['orders', 'current']);
  }

  updateOrder(order: OrderModel) {
    const { message, newStatus } = this.settingService.getOrderMessage(
      order.orderStatus
    );
    const dialogRef = this.messageService.sendSystemMessage({
      type: MessageType.update,
      title: newStatus,
      messageText: message,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === DialogResult.ok) {
        this.orderService.dispatchUpdateOrder(order.id, newStatus);
      } else {
        return;
      }
    });
  }

  nextOrderStatus(orderStatus: Ecommerce.OrderStatus): string {
    switch (orderStatus) {
      case Ecommerce.OrderStatus.RECEIVED:
        return 'Confirm Order';
      case Ecommerce.OrderStatus.CONFIRMED:
        return 'Pack Order';
      case Ecommerce.OrderStatus.PACKED:
        return 'Ship Order';
      case Ecommerce.OrderStatus.SHIPPED:
        return 'Manually Close Order';
      case Ecommerce.OrderStatus.RESERVED:
        return 'Make a Backorder';
      case Ecommerce.OrderStatus.CLOSED:
        return 'Reopen Order';
      default:
        return 'Receive Order';
    }
  }
}
