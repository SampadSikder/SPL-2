import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import * as crypto from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  bo: string= '';
  password: string= '';

  baseUrl = 'http://localhost:4000/api/login/';
  constructor(private http: HttpClient,  private router: Router,) { }
    isAuthenticated: boolean=false;

  matchInfo(){
    let hash = crypto.SHA256(this.password).toString();
    const data = { bo: this.bo, password: hash };
      this.http.post(this.baseUrl, data)
      .subscribe((response: any) => {
        if (response.message =="Login Successful") {
          alert('Sign in successful');
          let token= response.token;
          localStorage.setItem('token',token);

          // this.auth.setAuth(true);
          this.isAuthenticated=true;
          // console.log("sign in: "+this.isAuthenticated);
          this.router.navigate(['companyProfile']);

        } else {
          alert('Sign in failed.');
        }
      });
  }
}
