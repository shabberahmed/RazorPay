import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../payment/payment.service';

@Component({
  selector: 'app-paymentdata',
  templateUrl: './paymentdata.component.html',
  styleUrls: ['./paymentdata.component.scss'],
})
export class PaymentdataComponent implements OnInit {
  constructor(private paymentService: PaymentService) {}
  paymentsData!: any;
  loading: boolean = false; 

  ngOnInit(): void {
    this.check();
  }

  check() {
    this.loading = true; 
    this.paymentService.getAllPaymentData().subscribe((data: any) => {
      console.log(data.auth.items);
      this.paymentsData = data.auth.items;
      this.loading = false; 
    });
  }

  getSeverity(status: string | undefined) {
    if (status) {
      switch (status) {
        case 'captured':
          return 'success';
        case 'refunded':
          return 'warning';
        case 'failed':
          return 'danger';
        default:
          return 'info';
      }
    } else {
      return 'info';
    }
  }
}
