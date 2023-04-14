import { ErrorHandler, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { GlobalErrorHandler } from './global-error-handler';

//Internal Modules
import { ProductModule } from './product/product.module';
import { SharedComponentsModule } from './shared-components/shared-components.module';

import { EffectsModule } from '@ngrx/effects';

//State Components
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ServerErrorInterceptor } from './services/server-error.interceptor';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { productsReducer } from './product/state/reducer';
import { routerReducer } from '@ngrx/router-store';
import { ProductsEffects } from './product/state/effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedComponentsModule,
    HttpClientModule,
    StoreModule.forRoot({ products: productsReducer, router: routerReducer }),
    EffectsModule.forRoot([ProductsEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    ProductModule,
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true,
    },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
