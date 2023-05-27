import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Investor } from 'src/app/models/investor.model';
import { AuthService } from 'src/app/services/auth.service';
import * as crypto from 'crypto-js';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  isAuthenticated: boolean = false;
  otpMatched:boolean=false;
  otpBox:boolean=true;
  user: Investor = new Investor();
  otp:string='';
  constructor(private auth:AuthService,private http:HttpClient){}
  ngOnInit(): void {
    this.auth.check1((isAuthenticated) => {
      if (isAuthenticated) {
        this.isAuthenticated=true;
      } else {
        this.isAuthenticated=false;
      }
    });
    this.getProfile();

  }
  getProfile() {
    this.getUser().subscribe((data) => {
      this.user=data['user'];});
  }

  getUser() {
    const url='http://localhost:4000/api/getUser/';
    return this.http.post<any>(url,{});
  }
  alterPassword() {
    const url='http://localhost:4000/api/changePass/';
    let hash = crypto.SHA256(this.user.password).toString();
    return this.http.post<any>(url,{password:hash});
  }

  changePassword(){
    this.alterPassword().subscribe((data)=>{
      alert(data['message']);
    });
    
  }
  matchOTP(){
    this.checkOtp().subscribe((data)=>{
      if(data==1){
        this.otpMatched=true;
      }
    });
  }
  changeOtp(){
    const url='http://localhost:4000/api/changeOtp/';
    return this.http.post<any>(url,{});
  }
  sendOTP(){
    this.changeOtp().subscribe((data)=>{});
  }
  checkOtp(){
    const url='http://localhost:4000/api/matchOtp/';
    return this.http.post<any>(url,{otp:this.otp});
  }

}