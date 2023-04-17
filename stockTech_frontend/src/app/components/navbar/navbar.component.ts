import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public auth: AuthenticationService) { }
  isAuthenticated: boolean=this.auth.isAuthenticated;

  logout(){
    this.auth.isAuthenticated=false;
    this.isAuthenticated=false;
    console.log("logout: "+this.isAuthenticated);
  }

}
