import { Component, OnInit } from '@angular/core';
import { Loan } from 'src/app/models/loan.model';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit{
  loanRequests: Loan[] = [];
  ngOnInit(): void {
    this.loanRequests = [
      {
        loanID: 1,
        BO: 1234,
        date: new Date('2023-04-20'),
        amount: 10000,
        status: 'Pending'
      },
      {
        loanID: 2,
        BO: 5678,
        date: new Date('2023-04-21'),
        amount: 15000,
        status: 'Approved'
      },
      {
        loanID: 3,
        BO: 9012,
        date: new Date('2023-04-22'),
        amount: 20000,
        status: 'Rejected'
      }
    ];
  }

  acceptRequest(request: Loan): void {
    request.status='Approved'
    // TODO: Implement accept request logic here
  }

  rejectRequest(request: Loan): void {
    request.status='Rejected'
    // TODO: Implement reject request logic here
  }
  
 

}
