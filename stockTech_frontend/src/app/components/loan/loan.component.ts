import { Component, OnInit } from '@angular/core';
import { Loan } from '../../models/loan.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit{
  myForm!: FormGroup;

  ngOnInit(): void {
    this.getLoanList();
    this.myForm = new FormGroup({
      'total': new FormControl(null, [Validators.required, Validators.min(0)]),
      'term': new FormControl(null, [Validators.required, Validators.min(0)])
    }); 
    
  }

  amount:number=0;
  term:number=0;

  loan!: Loan;

  loans: Loan[] = [
    new Loan(1, 10000, 6, new Date(2022, 1, 1), new Date(2022, 1, 15), 'paid'),
    new Loan(2, 15000, 12, new Date(2022, 2, 1), new Date(2022, 2, 15), 'unpaid'),
    new Loan(3, 20000, 24, new Date(2022, 3, 1), new Date(2022, 3, 15), 'unpaid'),
  ];

  loanRequest(){
    this.loan.amount=this.amount;
    this.loan.term=this.term;
    this.loan.issueDate=new Date();
    this.loan.status='unpaid';
   
    alert("Request is sent successfully")
  }

   getLoanList() {
   

    // throw new Error('Function not implemented.');
  }

  pay(){

  }
}


