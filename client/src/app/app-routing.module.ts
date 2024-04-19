import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './payment/payment.component';
import { SuccessComponent } from './success/success.component';
import { PaymentdataComponent } from './paymentdata/paymentdata.component';

const routes: Routes = [
  { path: '', component: PaymentComponent, pathMatch:'full' },
  { path: 'payment-success', component: SuccessComponent },
  { path: 'all-payments', component: PaymentdataComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
