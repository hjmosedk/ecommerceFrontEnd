import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Input()
  title: string = '';

  constructor(private router: Router) {}

  createNewProduct() {
    this.router.navigate(['/newProduct']);
  }

  viewAllProducts() {
    this.router.navigate(['/products/admin']);
  }
}
