import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Deposit, Withdraw } from 'src/app/models/deposit.model';

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
 
  myForm!: FormGroup;

  timeRemaining = 120;
  minutes: number=0;
  seconds: number=0;
  timer: any;
  timerFinished = false;

  otpBox: boolean=false;

  isAuthenticated: boolean = true;
  invoice: number=0;
  

  depositList:Deposit[]=[];
  withdrawList:Withdraw[]=[];

  newdeposit: Deposit=new Deposit();
  newwithdraw: Withdraw=new Withdraw();


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
  this.depositList=[
      {
        bo: '1234',
        transID: 1,
        amount: 1000,
        date: new Date('2023-04-29'),
        phone: "1234567890"
      },
      {
        bo: '5678',
        transID: 2,
        amount: 2000,
        date: new Date('2023-04-28'),
        phone: "9876543210"
      },
      {
        bo: '9012',
        transID: 3,
        amount: 500,
        date: new Date('2023-04-27'),
        phone: "1112223333"
      }
    
  ] ; 
  }
  get_withdraw_list() {
 this.withdrawList=[
  {
    requestID: 1,
    BO: 1234,
    date: new Date('2023-04-26'),
    amount: 500,
    status: 'Completed'
  },
  {
    requestID: 2,
    BO: 5678,
    date: new Date('2023-04-25'),
    amount: 1000,
    status: 'Pending'
  },
  {
    requestID: 3,
    BO: 9012,
    date: new Date('2023-04-24'),
    amount: 200,
    status: 'Cancelled'
  }
 ];
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
    console.log(this.newdeposit.phone);
    //otp functionality
  }

  getInvoice(){
    this.invoice= Math.floor(Math.random() * 900000) + 100000;
  }

  makePayment(){
    this.newdeposit.date=new Date();
    //send amount and date
  }

  makeWithdraw(){
    this.newwithdraw.date=new Date();
     //send amount and date
     alert("request sent successfully");
  }

}
