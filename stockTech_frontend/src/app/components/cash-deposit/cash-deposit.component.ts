import { Component, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  @Input() total_amount: number = 0;
  otpBox: boolean=false;

  constructor(private http: HttpClient, private modalService: NgbModal) { }

  open(content: any) {

    this.modalService.open(content);
  }

  getOTP(){
    this.otpBox=true;
  }

  makePayment(){
    
  }

}
