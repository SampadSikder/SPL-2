import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/order';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit{
  isAuthenticated: boolean = false;
  executedList: Transaction[] = [];
  constructor(private http:HttpClient,private auth:AuthService){}
  ngOnInit(): void {
    this.auth.check1((isAuthenticated) => {
      if (isAuthenticated) {
        this.isAuthenticated=true;
      } else {
        this.isAuthenticated=false;
      }
    });
    this.getExecutedList();
  }
  getTransactions(){
    const url='http://localhost:4000/api/getTransactions/'
    return this.http.post<any>(url,{});
  }
  getExecutedList() {
    this.getTransactions().subscribe((data)=>{
      this.executedList=data["list"];
      console.log(this.executedList);
    }); 
  }
}