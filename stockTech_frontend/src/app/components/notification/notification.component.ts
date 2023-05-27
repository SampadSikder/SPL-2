import { Component, OnInit } from '@angular/core';
import { Notification } from 'src/app/models/notification.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit{
  list: Notification[]=[];
  constructor(private http:HttpClient,private auth:AuthService){}
  isAuthenticated:boolean=false;
ngOnInit(): void {
  this.auth.check1((isAuthenticated) => {
    if (isAuthenticated) {
      this.isAuthenticated=true;
    } else {
      this.isAuthenticated=false;
    }
  });
  this.setNotification();
  
}
  getNotifiction() {
    const baseUrl='http://localhost:4000/api/notices/';
    
    return this.http.post<any>(baseUrl,{});
  }
  setNotification():void{
    this.getNotifiction().subscribe((data1) => {
      this.list=data1['notifications']; });
  }

}
