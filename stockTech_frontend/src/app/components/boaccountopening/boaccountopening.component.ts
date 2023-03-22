import { Component, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-boaccountopening',
  templateUrl: './boaccountopening.component.html',
  styleUrls: ['./boaccountopening.component.css']
})
export class BoaccountopeningComponent {

    accountType: string='';
    operator: string='';
    cycle: string='';
    Phone: string = '';
    OTP: string = '';
    fhnidLength : string = '';
    fhname : string = '';
    fhnid : string = '';
    fhFatHusname: string = '';
    fhMotname: string = '';
    fhDob : string = '';
    fhSex : string = '';
    fhPassport : string = '';
    fhPassportIssuePlace : string ='';
    fhPassportIssueDate : string ='';
    fhPassportExpiryDate : string ='';
    fhEmail : string = '';
    fhPhone : string = '';
    fhAddress : string = '';
    fhDiv : string = '';
    fhCity : string = '';
    fhZip : string = '';
    fhOccup : string = '';
    fhTin : string = '';
    shnidLength : string = '';
    shname : string = '';
    shnid : string = '';
    shFatHusname: string = '';
    shMotname: string = '';
    shDob : string = '';
    shSex : string = '';
    shPassport : string = '';
    shPassportIssuePlace : string ='';
    shPassportIssueDate : string ='';
    shPassportExpiryDate : string ='';
    shEmail : string = '';
    shPhone : string = '';
    shAddress : string = '';
    shDiv : string = '';
    shCity : string = '';
    shZip : string = '';
    shOccup : string = '';
    shTin : string = '';
    routingNo : string = '';
    bankName : string = '';
    branchName : string = '';
    accountNo : string = '';
    fhPhoto!: File | null;
    fhSign!: File | null;
    shPhoto!: File | null;
    shSign!: File | null;
    cheque!: File | null;


    showOtp: boolean = false;
    otpVerified: boolean =false;
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
          console.log(res);
          if (res == "1") {
          
            this.otpVerified=true;
          }
          else { this.verifyOtp = false; }
        },
        error: (e) => {
          console.log('Error:', e);
        }
      });
  
    }

    onfhPhotoSelected(event:Event) {
      const fileInput = event.target as HTMLInputElement;
      if (fileInput.files && fileInput.files.length > 0) {
        this.fhPhoto = fileInput.files[0];
  }
    }
    onfhSignSelected(event:Event) {
      const fileInput = event.target as HTMLInputElement;
      if (fileInput.files && fileInput.files.length > 0) {
        this.fhSign = fileInput.files[0];
    }}
    onshPhotoSelected(event:Event) {
      const fileInput = event.target as HTMLInputElement;
      if (fileInput.files && fileInput.files.length > 0) {
        this.shPhoto= fileInput.files[0];
    }}
    onshSignSelected(event:Event) {
      const fileInput = event.target as HTMLInputElement;
      if (fileInput.files && fileInput.files.length > 0) {
        this.shSign = fileInput.files[0];
    }}
    onChequeSelected(event:Event) {
      const fileInput = event.target as HTMLInputElement;
      if (fileInput.files && fileInput.files.length > 0) {
        this.cheque = fileInput.files[0];
    }}

  submit(){
    
    const data = {accountType: this.accountType,
      operator: this.operator,
      cycle: this.cycle,
      fhName: this.fhname,
      fhFatHus: this.fhFatHusname,
      fhMot: this.fhMotname,
      fhSex: this.fhSex,
      fhNid: this.fhnid,
      fhDob: this.fhDob,
      fhPassport: this.fhPassport,
      fhPassportIssuePlace: this.fhPassportIssuePlace,
      fhPassportIssueDate: this.fhPassportIssueDate,
      fhPassportExpiryDate: this.fhPassportExpiryDate,
      fhOccupation: this.fhOccup,
      fhTin: this.fhTin,
      fhAddress: this.fhAddress,
      fhCity: this.fhCity,
      fhDiv: this.fhDiv,
      fhZip: this.fhZip,
      fhPhone: this.fhPhone,
      fhEmail: this.fhEmail,
      fhPic: this.fhPhoto?.name,
      fhSign: this.fhSign?.name,
      shName: this.shname,
      shFatHus: this.shFatHusname,
      shMot: this.shMotname,
      shSex: this.shSex,
      shNid: this.shnid,
      shDob: this.shDob,
      shPassport: this.shPassport,
      shPassportIssuePlace: this.shPassportIssuePlace,
      shPassportIssueDate: this.shPassportIssueDate,
      shPassportExpiryDate: this.shPassportExpiryDate,
      shOccupation: this.shOccup,
      shTin: this.shTin,
      shAddress: this.shAddress,
      shCity: this.shCity,
      shDiv: this.shDiv,
      shZip: this.shZip,
      shPhone: this.shPhone,
      shEmail: this.shEmail,
      shPic: this.shPhoto?.name?? '',
      shSign: this.shSign?.name?? '',
      cheque:this.cheque?.name,
      numOfNominee:'0',
      payment:'yes',
      routingNo:this.routingNo,
      bankName:this.bankName,
      branch:this.branchName,
      bankAC:this.accountNo}

      console.log(data);
    const fd = new FormData();
    
    this.http.post('http://localhost:4000/api/createBO/', data)
    .subscribe(res => {
      console.log(res);
      alert("BO account created successfully.");
    });

    }

  //   this.myform.valueChanges.subscribe(res=>{
  //     if(res.acc=='whatever number or text '){
  //       this.joint= true;
  //     }else{
  //       this.joint = false;
  //     }
  //  });
}
