import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Deposit, Withdraw } from 'src/app/models/deposit.model';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
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

  otpBox: boolean=false;
  otp:string='';

  isAuthenticated: boolean = false;
  invoice: number=0;
  

  depositList:Deposit[]=[];
  withdrawList:Withdraw[]=[];

  newdeposit: Deposit=new Deposit();
  newwithdraw: Withdraw=new Withdraw();


  constructor(private http: HttpClient, private modalService: NgbModal,private auth:AuthService) { }
  ngOnInit(): void {
    this.auth.check1((isAuthenticated) => {
      if (isAuthenticated) {
        this.isAuthenticated=true;
      } else {
        this.isAuthenticated=false;
      }
    });
   this.get_deposit_list();
   this.get_withdraw_list();
  }

  get_deposit_list() {
    this.getDeposits().subscribe((data1) => {
      this.depositList=data1['deposits'];
  });
  }
  get_withdraw_list() {
    this.getWithdraws().subscribe((data1) => {
      this.withdrawList=data1['withdraws'];
      console.log(this.withdrawList);
  });
}

  open(content: any) {
    this.myForm = new FormGroup({
      'quantity': new FormControl(null, [Validators.required, Validators.min(1)])
    }); 
    this.modalService.open(content);
    this.getInvoice();
  }

  makePayment(){
    const url='http://localhost:4000/api/deposit/'
    this.http.post(url,{phone:this.newdeposit.phone,otp:this.otp,amount:this.newdeposit.amount}).subscribe((data) => {
      if(data=="1"){
        alert("Successfully deposited");
      }
      else{
        alert("OTP does not match. Deposit failed.");
      }
      this.otpBox=false;
      window.location.reload();
    });
    
    //otp functionality
  }

  getInvoice(){
    this.invoice= Math.floor(Math.random() * 900000) + 100000;
  }

  getOTP(){
    const url='http://localhost:4000/api/depositOTP/'
    this.http.post(url,{phone:this.newdeposit.phone}).subscribe((data) => {
      this.otpBox=true;});
  }

  withdrawReq():Observable<any>{
    const url='http://localhost:4000/api/withdraw/'
    return this.http.post<any>(url,{amount:this.newwithdraw.amount});}

  makeWithdraw(){
    this.withdrawReq().subscribe((data) => {
      alert(data['message']);
      window.location.reload();}
      );
    
  }

  getWithdraws(): Observable<any> {
    const url='http://localhost:4000/api/withdraws/'
    return this.http.post<any>(url, { });
  }

  getDeposits(): Observable<any> {
    const url='http://localhost:4000/api/deposits/'
    return this.http.post<any>(url, { });
  }
}