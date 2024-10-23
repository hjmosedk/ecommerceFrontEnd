import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-hero-banner',
    templateUrl: './hero-banner.component.html',
    styleUrl: './hero-banner.component.css',
    standalone: true,
    imports: [MatButton],
})
export class HeroBannerComponent {
  constructor(private router: Router) {}

  shopNow() {
    this.router.navigate(['products']);
  }
}
