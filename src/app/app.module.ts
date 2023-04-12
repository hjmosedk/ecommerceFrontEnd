import { ErrorHandler, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { GlobalErrorHandler } from './global-error-handler';

//Internal Modules
import { ProductModule } from './product/product.module';
import { SharedComponentsModule } from './shared-components/shared-components.module';

import { EffectsModule } from '@ngrx/effects';

//State Components
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedComponentsModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    ProductModule,
  ],
  providers: [{ provide: ErrorHandler, useClass: GlobalErrorHandler }],
  bootstrap: [AppComponent],
})
export class AppModule {}
