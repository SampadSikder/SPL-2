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
    this.investors = [
      {
          name: "John Doe",
          BO_account_no: "123456789",
          phone: "1234567890",
          email: "johndoe@example.com",
          nid: "1234567890123",
          address: "123 Main St, Anytown, USA",
          bank: "Example Bank",
          bankNum: "9876543210",
          withdrawRequests: [
              {
                  requestID: 1,
                  BO: 123456789,
                  date: new Date(),
                  amount: 500,
                  status: "pending"
              },
              {
                  requestID: 2,
                  BO: 123456789,
                  date: new Date(),
                  amount: 1000,
                  status: "approved"
              }
          ],
          deposits: [
              {
                  bo: "123456789",
                  transID: 1,
                  amount: 2000,
                  date: new Date(),
                 
              },
              {
                  bo: "123456789",
                  transID: 2,
                  amount: 5000,
                  date: new Date(),
                 
              }
          ]
      },
      {
          name: "Jane Doe",
          BO_account_no: "987654321",
          phone: "9876543210",
          email: "janedoe@example.com",
          nid: "9876543210987",
          address: "456 Oak St, Anytown, USA",
          bank: "Example Bank",
          bankNum: "1234567890",
          withdrawRequests: [
              {
                  requestID: 3,
                  BO: 987654321,
                  date: new Date(),
                  amount: 1000,
                  status: "approved"
              }
          ],
          deposits: [
              {
                  bo: "987654321",
                  transID: 3,
                  amount: 10000,
                  date: new Date(),
                 
              }
          ]
      }
  ];
  
  
  }
 


  selectedInvestor: Investor =new Investor();

  onSelect(investor: Investor): void {
    this.selectedInvestor = investor;
  }

  remove(investor: Investor): void {
    //remove user
  }

}
