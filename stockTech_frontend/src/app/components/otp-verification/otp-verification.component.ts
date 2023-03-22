import { Component, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent {
  Phone: string = '';
  OTP: string = '';
  showOtp: boolean = false;
  showPhone: boolean = true;
  verifyOtp: boolean = true;
  baseUrl = 'http://localhost:4000/api/verifyPhone/';
  baseUrl1 = 'http://localhost:4000/api/checkotp/';

  constructor(private http: HttpClient, private elementRef: ElementRef, private router: Router) { }

  sendPhone() {
    this.http.post(this.baseUrl, { phone: this.Phone }).subscribe(
      (response) => {
        this.showOtp = true;
        this.showPhone = false;
      },
      (error) => {
        console.error('Error:', error);
      }
    );

  }

  sendOtp() {
    this.http.post(this.baseUrl1, { otp: this.OTP }).subscribe({
      next: (res) => {
        if (res == "1") {
          this.router.navigate(['/boaccount']);
        }
        else { this.verifyOtp = false; }
      },
      error: (e) => {
        console.log('Error:', e);
      }
    });

  }
}
