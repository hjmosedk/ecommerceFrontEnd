import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import { Observable } from 'rxjs';
import { Ecommerce } from 'ckh-typings';
import { Router } from '@angular/router';
import { OrderModel } from 'ckh-typings/dist/ecommerce';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrl: './list-orders.component.css',
})
export class ListOrdersComponent implements OnInit {
  constructor(private ordersService: OrdersService, private router: Router) {}
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
    console.log('Order updated');
    console.log('Order data: ', order);
    console.log('Function not implemented!');
  }

  capitalize(orderStatus: string) {
    const lowerCaseStatus = orderStatus.toLowerCase();
    return lowerCaseStatus.charAt(0).toUpperCase() + lowerCaseStatus.slice(1);
  }
}
