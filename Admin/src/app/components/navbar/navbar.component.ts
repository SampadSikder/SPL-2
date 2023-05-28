import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private router:Router,private auth: AuthService){}

  isAuthenticated: boolean=false;
  // isAuthenticated: boolean=this.auth.isAuthenticated;

  ngOnInit(): void {
    this.auth.check1((isAuthenticated) => {
      if (isAuthenticated) {
        this.isAuthenticated=true;
      } else {
        this.isAuthenticated=false;
      }
    });
  }
  logout(){
    localStorage.removeItem('token');
    this.isAuthenticated=false;
    // window.location.reload();

    const targetUrl = '/'; 
    window.location.href = targetUrl;

  }
  

}



