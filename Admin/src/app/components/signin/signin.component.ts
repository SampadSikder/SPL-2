import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  constructor(private router: Router){};

  email:string='';
  password:string='';

  passwordFieldType = 'password';
  passwordFieldIcon = 'far fa-eye';
  
  togglePassword() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    this.passwordFieldIcon = this.passwordFieldType === 'password' ? 'far fa-eye' : 'far fa-eye-slash';
  }

  signin(){
    this.router.navigate(["home"]);
    
  }

}
