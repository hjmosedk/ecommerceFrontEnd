import {
  orderStatusChange,
  SettingService,
} from './../../settings/setting.service';
import { Component, OnInit } from '@angular/core';
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
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { NgClass, AsyncPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { CapitalizePipe } from '../../shared/pipes/capitalize.pipe';
import { CalculatePricePipe } from '../../shared/pipes/calculate-price.pipe';

@Component({
    selector: 'app-list-orders',
    templateUrl: './list-orders.component.html',
    styleUrl: './list-orders.component.css',
    standalone: true,
    imports: [
        MatTable,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatCellDef,
        MatCell,
        NgClass,
        MatButton,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        AsyncPipe,
        CapitalizePipe,
        CalculatePricePipe,
    ],
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

  orderMessage!: orderStatusChange;

  ngOnInit(): void {
    this.ordersService.listAllOrders();
  }

  viewOrder(id: number) {
    this.orderService.setCurrentOrder(id);
    this.router.navigate(['orders', 'current']);
  }

  updateOrder(order: OrderModel) {
    this.settingService
      .getOrderMessage(order.orderStatus)
      .subscribe((message) => {
        this.orderMessage = message;

        const { title, content } = this.orderMessage;
        const dialogRef = this.messageService.sendSystemMessage({
          type: MessageType.update,
          title,
          messageText: content,
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result === DialogResult.ok) {
            this.orderService.dispatchUpdateOrder(order.id, title);
          } else {
            return;
          }
        });
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
