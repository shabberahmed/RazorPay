import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}
