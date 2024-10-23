import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
    standalone: true,
    imports: [MatToolbar, MatButton],
})
export class FooterComponent {
  constructor(private router: Router) {}
  @Input()
  title: string = '';

  navigateToPage(page: string) {
    this.router.navigate([page]);
  }
}
