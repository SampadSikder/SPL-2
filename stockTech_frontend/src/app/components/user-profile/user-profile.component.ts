import { Component, OnInit } from '@angular/core';
import { Investor } from 'src/app/models/investor.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  isAuthenticated: boolean = true;
  user: Investor = new Investor();
  otp: string='';
  otpMatched: boolean=false;

  ngOnInit(): void {
    this.getProfile();

  }
  getProfile() {
      this.user = {
        name: "John Doe",
        BO_account_no: "123456789",
        phone: "01234567890",
        email: "johndoe@example.com",
        password: "p@ssw0rd",
        nid: "1234567890123",
        address: "123 Main St, Anytown, USA",
        bank: "Example Bank",
        bankNum: "9876543210"
    };


    // this.user.name = "John Doe";
    // this.user.BO_account_no = "123456789";
    // this.user.phone = "555-1234";
    // this.user.email = "john.doe@example.com";
    // this.user.password = "mypassword";
    // this.user.nid = "1234567890";
    // this.user.address = "123 Main St";
    // this.user.bank = "My Bank";
    // this.user.bankNum = "987654321";


  }

  edit() {
    //send user profile
  }

  changePassword(){
    if (confirm('Are you sure you want to change password?')) {
      alert("Password is reset successfully.");
      // User clicked "OK", so proceed with the delete action
    } else {
      // User clicked "Cancel", so do nothing
      alert("Password remains unchanged");
    }
  }


  matchOTP(OTP: string){
    OTP=this.otp;

    //some func t
    // if(OTP=='a')
      // this.otpMatched=true;
  }

}
