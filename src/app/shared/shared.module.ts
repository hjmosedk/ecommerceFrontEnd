import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SplitterbarComponent } from './components/splitterbar/splitterbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [NavbarComponent, SplitterbarComponent, FooterComponent],
  exports: [
    NavbarComponent,
    MatIconModule,
    MatButtonModule,
    SplitterbarComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ],
})
export class SharedModule {}