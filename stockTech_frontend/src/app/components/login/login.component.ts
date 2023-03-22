import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
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
  constructor(private http: HttpClient) { }

  matchInfo(){
    let hash = crypto.SHA256(this.password).toString();
    const data = { bo: this.bo, password: hash };
      this.http.post(this.baseUrl, data)
      .subscribe((response: any) => {
        if (response.message =="Login Successful") {
          alert('Sign in successful');
          let token= response.token;
          localStorage.setItem('token',token);
        } else {
          alert('Sign in failed.');
        }
      });
  }
}
