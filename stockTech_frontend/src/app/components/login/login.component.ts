import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink, NavigationExtras } from '@angular/router';
import { OnInit } from '@angular/core';
import * as crypto from 'crypto-js';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  bo: string = '';
  password: string = '';

  baseUrl = 'http://localhost:4000/api/login/';
  constructor(private http: HttpClient, private router: Router, private auth: AuthService) { }
  isAuthenticated: boolean = false;
  ngOnInit(): void {
    this.auth.check1((isAuthenticated) => {
      if (isAuthenticated) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    });

  }


  matchInfo() {
    let hash = crypto.SHA256(this.password).toString();
    const data = { bo: this.bo, password: hash };
    this.http.post(this.baseUrl, data)
      .subscribe((response: any) => {
        if (response.message == "Login Successful") {
          alert('Sign in successful');
          let token = response.token;
          localStorage.setItem('token', token);

          // this.auth.setAuth(true);
          this.isAuthenticated = true;
          // window.location.reload();
          // this.router.navigate(["home"]);

          const targetUrl = 'home'; 
          window.location.href = targetUrl;


        } else {
          alert('Sign in failed.');
        }
      });
      
  }
}
