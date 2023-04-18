import { Component, OnInit } from '@angular/core';
import { Loan } from '../../models/loan.model';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit{

  ngOnInit(): void {
    this.getLoanList();
  }

  amount:number=0;
  term:number=0;
  loanList: Loan[]=[];

  loanRequest(){
    let date=new Date();
    console.log(date);
    console.log(this.amount);
    alert("Request is sent successfully")
  }

   getLoanList() {
    // throw new Error('Function not implemented.');
  }
}


