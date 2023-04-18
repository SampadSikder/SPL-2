import { Component, Input, OnInit } from '@angular/core';
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
export class CashDepositComponent implements OnInit{
 
  paymentStatus:string='';
  total_amount: number = 0;
  total_amount2: number = 0;

  otpBox: boolean=false;

  depositList:any;
  withdrawList:any;

  constructor(private http: HttpClient, private modalService: NgbModal) { }
  ngOnInit(): void {
   this.get_deposit_list();
   this.get_withdraw_list();
  }


  get_deposit_list() {
    throw new Error('Method not implemented.');
  }
  get_withdraw_list() {
    throw new Error('Method not implemented.');
  }

  open(content: any) {
    this.modalService.open(content);
  }

  getOTP(){
    this.otpBox=true;
    //otp functionality
  }

  getInvoice(): number{
    return Math.floor(Math.random() * 900000) + 100000;
  }

  makePayment(){
    let date= new Date();
    //send amount and date
  }

  makeWithdraw(amount: number){
    let date= new Date();
     //send amount and date
  }

}
