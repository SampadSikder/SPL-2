import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  isAuthenticated: boolean = true;
  constructor(private router: Router, private auth: AuthService) { };

  email: string = '';
  password: string = '';

  passwordFieldType = 'password';
  passwordFieldIcon = 'far fa-eye';


  ngOnInit(): void {
    this.isAuthenticated = this.auth.isAuthenticated;
    this.togglePassword();

  }


  togglePassword() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    this.passwordFieldIcon = this.passwordFieldType === 'password' ? 'far fa-eye' : 'far fa-eye-slash';
  }

  signin() {
    //verify

    //only if authenticated
    {
      this.auth.isAuthenticated = true;
      this.router.navigate(["home"]);
    }
  }

}
