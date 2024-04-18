import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

interface BasicPaymentAuthResponse {
  auth: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  getKey() {
    return this.http.get<any>("http://localhost:3000/key");
  }

  makePayment(amount: number) {
    return this.http.post<any>("http://localhost:3000/payments", { amount });
  }

  getBasicPaymentAuth(): Observable<BasicPaymentAuthResponse> {
    return this.http.get<BasicPaymentAuthResponse>('http://localhost:3000/payments/base/auth');
  }

  getAllPaymentData() {
    // return this.getBasicPaymentAuth().pipe(
    //   switchMap((response: BasicPaymentAuthResponse) => {
    //     const headers = {
    //       'Authorization': `Basic ${response.auth}`,
    //       'Content-Type': 'application/json'
    //     };
    //     return this.http.get<any>('https://api.razorpay.com/v1/payments/', { headers: headers });
    //   })
    // );
    return this.http.get("http://localhost:3000/payments/base/auth")
  }
}
