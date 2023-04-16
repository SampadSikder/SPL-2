import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-cash-deposit',
  templateUrl: './cash-deposit.component.html',
  styleUrls: ['./cash-deposit.component.css']
})
export class CashDepositComponent {
  private readonly storeId: string = 'stoch641dc11e5bedb';
  private readonly storePassword: string = 'stoch641dc11e5bedb@ssl';
  private readonly gatewayUrl: string = 'https://sandbox.sslcommerz.com/gwprocess/v4/api.php';

  paymentStatus:string='';
  total_amount:number=100;

  constructor(private http: HttpClient) { }

  initiatePayment(amount: number, tranId: string): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    const postData = `store_id=${this.storeId}&store_passwd=${this.storePassword}&currency=BDT&total_amount=${amount}&tran_id=${tranId}&success_url=http://localhost:4200/payment-success&fail_url=http://localhost:4200/payment-failed&cancel_url=http://localhost:4200/payment-cancelled`;

    return this.http.post(this.gatewayUrl, postData, httpOptions).toPromise();
  }


  // (function (window, document) {
  //   var loader = function () {
  //       var script = document.createElement("script"), tag = document.getElementsByTagName("script")[0];
  //       script.src = "https://sandbox.sslcommerz.com/embed.min.js?" + Math.random().toString(36).substring(7);
  //       tag.parentNode.insertBefore(script, tag);
  //   };
  
  //   window.addEventListener ? window.addEventListener("load", loader, false) : window.attachEvent("onload", loader);
  // })(window, document);

}
