import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { platformBrowser } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import * as crypto from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  BO_no: string= '';
  pass: string= '';
  


  signInForm: FormGroup=new FormGroup({
    'bo': new FormControl('', [Validators.required, Validators.pattern('[0-9]{20}')]),
    'password': new FormControl('', Validators.required),
    'rememberMe': new FormControl(false)
  }); ;

  baseUrl = 'http://localhost:4000/api/login/';
  constructor(private http: HttpClient,  private router: Router,) { }


  ngOnInit(): void {
    
  
  }
    isAuthenticated: boolean=false;

  matchInfo(){
    let hash = crypto.SHA256(this.pass).toString();
    const data = { BO_no: this.BO_no, pass: hash };
      this.http.post(this.baseUrl, data)
      .subscribe((response: any) => {
        if (response.message =="Login Successful") {
          alert('Sign in successful');
          let token= response.token;
          localStorage.setItem('token',token);

          // this.auth.setAuth(true);
          this.isAuthenticated=true;
          // console.log("sign in: "+this.isAuthenticated);
          this.router.navigate(['home']);

        } else {
          alert('Sign in failed.');
        }
      });
  }
}
