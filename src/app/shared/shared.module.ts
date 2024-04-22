import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SplitterbarComponent } from './components/splitterbar/splitterbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from '../app-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormField } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [NavbarComponent, SplitterbarComponent, FooterComponent],
  exports: [
    NavbarComponent,
    MatIconModule,
    MatButtonModule,
    SplitterbarComponent,
    FooterComponent,
    MatDialogModule,
    MatCardModule,
    FormsModule,
    MatFormField,
    ReactiveFormsModule,
    MatInputModule,
    MatSlideToggleModule,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    AppRoutingModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatFormField,
    ReactiveFormsModule,
    MatSlideToggleModule,
  ],
})
export class SharedModule {}
