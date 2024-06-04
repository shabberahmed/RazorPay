import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
declare var Razorpay: any; // Declare Razorpay global variable

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent  {
  items = [
    {
      amount: 1000,
      img: 'https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1712880000&semt=sph',
      type:"Make Appointment",
      // add needed data
      transferData:{
        name:"test",
        acc:'acc_OGzXkHDq5Bh6I3'
      }

    },
    {
      amount: 3000,
      img: 'https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_640,q_50/lsci/db/PICTURES/CMS/86300/86316.jpg',
      type:"Book Ground",
      transferData:{
        name:"test1",
      acc:'acc_OFxLMWvv76xIiM'
      }
    },
  ];

  constructor(private http: HttpClient,private router:Router) {}

  async checkoutHandler(amount: number,notes:{name:string,acc:string}) {
    const { key } = await this.http.get<any>("http://localhost:3000/key").toPromise();
    const { order } = await this.http.post<any>("http://localhost:3000/payments", { amount }).toPromise();

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "Dev Test",
      description: "RazorPay Test",
      image: "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
      order_id: order.id,
      callback_url: "http://localhost:3000/payments/verify",
      prefill: {
        name: "ahmed",
        email: "ahmed@email.com",
        contact: "9000347346",

      },
      notes: {
        name: notes.name,
        acc_id:notes.acc
      },
      theme: {
        "color": "#121212"
      }
    };

    const razor = new Razorpay(options);
    razor.open();
  }
  goToPaymentTable(){
    return this.router.navigate(['/all-payments'])
  }

}
