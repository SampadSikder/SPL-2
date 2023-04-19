import { Component } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  passwordFieldType = 'password';
  passwordFieldIcon = 'far fa-eye';
  
  togglePassword() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    this.passwordFieldIcon = this.passwordFieldType === 'password' ? 'far fa-eye' : 'far fa-eye-slash';
  }

  signin(){
    
  }

}
