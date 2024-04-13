import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { PaymentComponent } from './payment/payment.component';
import { AppRoutingModule } from './app-routing.module';
import { SuccessComponent } from './success/success.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    PaymentComponent,
    SuccessComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
