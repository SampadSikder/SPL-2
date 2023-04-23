import { Component , OnInit } from '@angular/core';
import { Notice } from 'src/app/models/notice.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit{
  constructor(private auth: AuthService){}
    
  notice: Notice= new Notice();
  isAuthenticated: boolean=false;

  ngOnInit(): void {
    this.isAuthenticated=this.auth.isAuthenticated;
  }

  sendNotice(){
    
  }
 
}
