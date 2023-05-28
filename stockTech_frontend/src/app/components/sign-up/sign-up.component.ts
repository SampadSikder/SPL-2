import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as crypto from 'crypto-js';
import { OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit{
  bo: string = '';
  email: string = '';
  password: string = '';
  password2: string = '';
  phone: string = '';
  OTP: string = '';
  showOtp: boolean = false;
  showPhone: boolean = true;
  verifyOtp: boolean = true;
  verified: boolean = false;
  isAuthenticated:boolean=false;

  baseUrl = 'http://localhost:4000/api/checkBO/';
  baseUrl1 = 'http://localhost:4000/api/checkotp/';
  baseUrl2 = 'http://localhost:4000/api/createAccount/';

  // form: FormGroup;
  constructor(private http: HttpClient,private auth:AuthService, private router: Router)  { }

  // ngOnInit() {
  //   this.form = this.formBuilder.group({
  //     email: [null, [Validators.required, Validators.email]],
  //     password: [null, Validators.required],
  //   });
  // }
  ngOnInit(): void {
    this.auth.check1((isAuthenticated) => {
      if (isAuthenticated) {
        this.isAuthenticated=true;
      } else {
        this.isAuthenticated=false;
      }
    });

  }
  checkBO() {
    this.http.post(this.baseUrl, { phone: this.phone,bo:this.bo }).subscribe(
      (res) => {
        alert(res);
        if((res=="BO account is already registered")||(res=="BO account does not exist")||(res=="Phone number does not match")){
          alert(res);
        }
        else{
        this.showOtp = true;
        // this.checkOtp();
      }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  checkOtp() {
    this.http.post(this.baseUrl1, { phone:this.phone,otp: this.OTP }).subscribe({
      next: (res) => {
        if (res == "1") {
          this.verified = true;
        }
        else { 
          alert("OTP does not match");
          this.verifyOtp = false; }
      },
      error: (e) => {
        console.log('Error:', e);
      }
    });
  }

  matchPassword() {
    if (this.password == this.password2) {
      let hash = crypto.SHA256(this.password).toString();
      console.log(hash);
      const data = { bo: this.bo, phone: this.phone, password: hash };
      this.http.post(this.baseUrl2, data)
        .subscribe((response: any) => {
          if (response == "Registered Successfully") {
            alert('Sign up successful');
          } else {
            alert('Sign up failed: ' + response.error);
          }
          this.router.navigate(["home"]);
        });
    }
    else {
      alert('Password does not match.');
    }
  }
}