
import { Withdraw } from 'src/app/models/withdraw.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-withdraw-req',
  templateUrl: './withdraw-req.component.html',
  styleUrls: ['./withdraw-req.component.css']
})
export class WithdrawReqComponent implements OnInit{
  constructor(private auth: AuthService){}
    

  list: Withdraw[] = [];
  isAuthenticated: boolean=false;
  

  ngOnInit(): void {
    this.isAuthenticated=this.auth.isAuthenticated;
    this.getList();
   
  }
  getList() {
   //add list here
   this.list=[
    { requestID: 1, BO: 1234, date: new Date("2022-04-18"), amount: 5000, status: 'Pending' },
    { requestID: 2, BO: 5678, date: new Date("2022-04-19"), amount: 10000, status: 'Approved' },
    { requestID: 3, BO: 91011, date: new Date("2022-04-20"), amount: 7500, status: 'Rejected' },
    { requestID: 4, BO: 121314, date: new Date("2022-04-21"), amount: 12500, status: 'Pending' },
    { requestID: 5, BO: 151617, date: new Date("2022-04-22"), amount: 9000, status: 'Approved' },
    { requestID: 6, BO: 181920, date: new Date("2022-04-23"), amount: 20000, status: 'Pending' },
    { requestID: 7, BO: 212223, date: new Date("2022-04-24"), amount: 15000, status: 'Rejected' },
    { requestID: 8, BO: 242526, date: new Date("2022-04-25"), amount: 3000, status: 'Pending' },
    { requestID: 9, BO: 272829, date: new Date("2022-04-26"), amount: 7500, status: 'Approved' },
    { requestID: 10, BO: 303132, date: new Date("2022-04-27"), amount: 10000, status: 'Pending' },
    { requestID: 11, BO: 333435, date: new Date("2022-04-28"), amount: 5000, status: 'Rejected' },
    { requestID: 12, BO: 363738, date: new Date("2022-04-29"), amount: 8000, status: 'Pending' },
    { requestID: 13, BO: 394041, date: new Date("2022-04-30"), amount: 15000, status: 'Approved' },
    { requestID: 14, BO: 424344, date: new Date("2022-05-01"), amount: 2000, status: 'Rejected' },
    { requestID: 15, BO: 454647, date: new Date("2022-05-02"), amount: 10000, status: 'Pending' },

   ]
  }

  acceptRequest(request: Withdraw): void {
    request.status='Approved'
    //Implement accept request logic here
  }

  rejectRequest(request: Withdraw): void {
    request.status='Rejected'
    //Implement reject request logic here
  }
  
 

}
