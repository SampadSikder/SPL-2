import { Component , OnInit } from '@angular/core';
import { Notice } from 'src/app/models/notice.model';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit{
  constructor(private auth: AuthService,private http:HttpClient){}
    
  notice: Notice= new Notice();
  isAuthenticated: boolean=false;

  ngOnInit(): void {
    this.auth.check1((isAuthenticated) => {
      if (isAuthenticated) {
        this.isAuthenticated=true;
      } else {
        this.isAuthenticated=false;
      }
    });
  }

  sendNotice(){
    this.http.post<any>('http://localhost:4000/admin/addannouncement/',{title:this.notice.title,body:this.notice.body}).subscribe((data)=>{
      alert("Successfully Added");
      window.location.reload();
    });
    
  }
 
}
