import { ErrorHandler, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { GlobalErrorHandler } from './global-error-handler';
import { environment } from 'src/environments/environment';

//Internal Modules
import { ProductModule } from './product/product.module';
import { SharedModule } from './shared/shared.module';
import { MessageModule } from './message/message.module';
import { OrdersModule } from './orders/orders.module';

//State Components
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot(),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      connectInZone: true,
    }),
    ProductModule,
    MessageModule,
    OrdersModule,
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    provideHttpClient(),
  ],
})
export class AppModule {}
