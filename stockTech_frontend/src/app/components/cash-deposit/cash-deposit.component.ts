import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  myForm!: FormGroup;

  timeRemaining = 120;
  minutes: number=0;
  seconds: number=0;
  timer: any;
  timerFinished = false;

  otpBox: boolean=false;

  isAuthenticated: boolean = true;
  invoice: number=0;
  

  depositList:any;
  withdrawList:any;

  constructor(private http: HttpClient, private modalService: NgbModal) { }
  ngOnInit(): void {
   this.get_deposit_list();
   this.get_withdraw_list();
  
  
  }

  setTimer() {
 
    this.minutes = Math.floor(this.timeRemaining / 60);
    this.seconds = this.timeRemaining % 60;
 
    this.timer = setInterval(() => {
      this.timeRemaining--;
      this.minutes = Math.floor(this.timeRemaining / 60);
      this.seconds = this.timeRemaining % 60;
 
      if (this.timeRemaining === 0) {
        clearInterval(this.timer);
        this.timerFinished = true;
      }
    }, 1000);
 
  }

  resendOTP(){
    this.timerFinished=false;
    this.timeRemaining = 120;
    this.setTimer();
    //resend func
  }

  get_deposit_list() {
    throw new Error('Method not implemented.');
  }
  get_withdraw_list() {
    throw new Error('Method not implemented.');
  }

  open(content: any) {
    this.myForm = new FormGroup({
      'quantity': new FormControl(null, [Validators.required, Validators.min(1)])
    }); 
    this.modalService.open(content);
    this.getInvoice();
  }

  getOTP(){
    this.otpBox=true;
    this.setTimer();
    //otp functionality
  }

  getInvoice(){
    this.invoice= Math.floor(Math.random() * 900000) + 100000;
  }

  makePayment(){
    let date= new Date();
    //send amount and date
  }

  makeWithdraw(amount: number){
    let date= new Date();
     //send amount and date
     alert("request sent successfully");
  }

}
