import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import * as crypto from 'crypto-js';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  isAuthenticated: boolean = false;
  baseUrl = 'http://localhost:4000/admin/login/';
  constructor(private router: Router, private auth: AuthService,private http:HttpClient) { };

  email: string = '';
  password: string = '';

  passwordFieldType = 'password';
  passwordFieldIcon = 'far fa-eye';


  ngOnInit(): void {
    console.log( this.isAuthenticated);
    this.auth.check1((isAuthenticated) => {
      console.log("haha");
      if (isAuthenticated) {
        this.isAuthenticated=true;
      } else {
        this.isAuthenticated=false;
      }
    });
    console.log( this.isAuthenticated);
    this.togglePassword();

  }


  togglePassword() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    this.passwordFieldIcon = this.passwordFieldType === 'password' ? 'far fa-eye' : 'far fa-eye-slash';
  }

  matchInfo(){
    let hash = crypto.SHA256(this.password).toString();
    const data = { email: this.email, password: hash };
      this.http.post(this.baseUrl, data)
      .subscribe((response: any) => {
        console.log(response.message);
        if (response.message =="Login Successful") {
          alert('Sign in successful');
          let token= response.token;
          localStorage.setItem('token',token);

          // this.auth.setAuth(true);
         
          this.isAuthenticated=true;
          window.location.reload();
          

        } else {
          
          alert('Sign in failed.');
        }
      });
  }
}
