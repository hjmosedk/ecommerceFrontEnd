import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { SplitterbarComponent } from './splitterbar/splitterbar.component';

@NgModule({
  declarations: [NavbarComponent, SplitterbarComponent],
  exports: [
    NavbarComponent,
    MatIconModule,
    MatButtonModule,
    SplitterbarComponent,
  ],
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule],
})
export class SharedComponentsModule {}
