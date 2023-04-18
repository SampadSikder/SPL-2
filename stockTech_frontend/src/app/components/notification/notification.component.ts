import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit{
  list: Notification[]=[];
  isAuthenticated: boolean = true;
  
ngOnInit(): void {
  this.getNotifiction();
}
  getNotifiction() {
    throw new Error('Method not implemented.');
  }

}
