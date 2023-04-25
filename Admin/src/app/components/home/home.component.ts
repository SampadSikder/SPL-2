import { Investor } from 'src/app/models/investor.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(private auth: AuthService){}
    
  investors: Investor[] = [];
  isAuthenticated: boolean=false;

  ngOnInit(): void { 
    //this.auth.isAuthenticated=true; //change here
    this.isAuthenticated=this.auth.isAuthenticated;
    this.getInvestorList();
  }

  getInvestorList() {
    // add list here
    this.investors=[
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        withdrawRequests: [
          { requestID: 1, BO: 1234, date: new Date("2022-04-18"), amount: 5000, status: 'Pending' },
          { requestID: 2, BO: 5678, date: new Date("2022-04-19"), amount: 10000, status: 'Approved' }
        ],
        loanRequests: [
          { loanID: 1, BO: 1234, date: new Date("2022-04-18"), amount: 5000, status: 'Pending' },
          { loanID: 2, BO: 5678, date: new Date("2022-04-19"), amount: 10000, status: 'Approved' }
        ]
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '123-456-7890',
        withdrawRequests: [
          { requestID: 3, BO: 91011, date: new Date("2022-04-20"), amount: 7500, status: 'Rejected' }
        ],
        loanRequests: [
          { loanID: 3, BO: 91011, date: new Date("2022-04-20"), amount: 7500, status: 'Rejected' }
        ]
      },
      {
        id: 3,
        name: 'Bob Johnson',
        email: 'bob.johnson@gmail.com',
        phone: '345-678-9012',
        withdrawRequests: [
          { requestID: 1, BO: 1234, date: new Date("2022-04-18"), amount: 1000, status: 'Rejected' },
          { requestID: 2, BO: 5678, date: new Date("2022-04-19"), amount: 2500, status: 'Approved' },
          { requestID: 3, BO: 91011, date: new Date("2022-04-20"), amount: 5000, status: 'Pending' },
        ],
        loanRequests: []
      },
      {
        id: 4,
        name: 'Michael Johnson',
        email: 'michaeljohnson@example.com',
        phone: '555-555-5555',
        withdrawRequests: [
          { requestID: 1, BO: 1234, date: new Date("2022-04-18"), amount: 15000, status: 'Approved' },
          { requestID: 2, BO: 5678, date: new Date("2022-04-19"), amount: 20000, status: 'Pending' },
        ],
        loanRequests: [
          { loanID: 1, BO: 1234, date: new Date("2022-04-18"), amount: 50000, status: 'Pending' },
          { loanID: 2, BO: 5678, date: new Date("2022-04-19"), amount: 75000, status: 'Approved' }
        ]
      }
    ]
  }
 


  selectedInvestor: Investor =new Investor();

  onSelect(investor: Investor): void {
    this.selectedInvestor = investor;
  }

  remove(investor: Investor): void {
    //remove user
  }

}
