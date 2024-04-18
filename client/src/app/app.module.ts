import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { PaymentComponent } from './payment/payment.component';
import { AppRoutingModule } from './app-routing.module';
import { SuccessComponent } from './success/success.component';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { PaymentdataComponent } from './paymentdata/paymentdata.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
@NgModule({
  declarations: [
    AppComponent,
    PaymentComponent,
    SuccessComponent,
    PaymentdataComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    CardModule,
    TableModule,
    CommonModule,
    ButtonModule,
    TagModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
