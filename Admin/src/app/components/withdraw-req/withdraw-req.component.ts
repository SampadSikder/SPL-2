import { HttpClient } from '@angular/common/http';
import { Withdraw } from 'src/app/models/withdraw.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-withdraw-req',
  templateUrl: './withdraw-req.component.html',
  styleUrls: ['./withdraw-req.component.css']
})
export class WithdrawReqComponent implements OnInit{
  constructor(private auth: AuthService,private http:HttpClient){}
    

  list: Withdraw[] = [];
  isAuthenticated: boolean=false;
  

  ngOnInit(): void {
    this.auth.check1((isAuthenticated) => {
      if (isAuthenticated) {
        this.isAuthenticated=true;
      } else {
        this.isAuthenticated=false;
      }
    });
    this.getList();
   
  }
  getList() {
    this.getReqs().subscribe((data)=>{
        this.list = data['withdraws'];
    });
  }
  getReqs() {
    const url='http://localhost:4000/admin/reqlist/';
    return this.http.post<any>(url,{});
  }

  acceptRequest(request:Withdraw){
    this.http.post<any>('http://localhost:4000/admin/handleReq/',{decision:"accepted",bo:request.bo,id:request.id,amount:request.amount}).subscribe((data)=>{
      alert("Successfully Accepted");
      window.location.reload();
    });
  }
  rejectRequest(request:Withdraw){
    this.http.post<any>('http://localhost:4000/admin/handleReq/',{decision:"rejected",bo:request.bo,id:request.id,amount:request.amount}).subscribe((data)=>{
      alert("Successfully Rejected");
      window.location.reload();
    });
  }
  
}
