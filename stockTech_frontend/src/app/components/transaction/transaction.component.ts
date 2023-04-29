import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/order.model';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit{
  isAuthenticated: boolean = true;
  executedList: Transaction[] = [];
  
  ngOnInit(): void {
    this.getExecutedList();
  }
  getExecutedList() {
    this.executedList = [
      {
          transID: 1,
          order: {
              orderID: 1,
              bo: "123456789",
              date: new Date(),
              tradeCode: "AAPL",
              price: 150,
              quantity: 10,
              pendingquantity: 0,
              type: "buy",
              status: "pending"
          },
          date: new Date(),
          quantity: 10
      },
      {
          transID: 2,
          order: {
              orderID: 2,
              bo: "123456789",
              date: new Date(),
              tradeCode: "GOOG",
              price: 200,
              quantity: 5,
              pendingquantity: 0,
              type: "sell",
              status: "partial"
          },
          date: new Date(),
          quantity: 3
      },
      {
          transID: 3,
          order: {
              orderID: 3,
              bo: "123456789",
              date: new Date(),
              tradeCode: "AAPL",
              price: 160,
              quantity: 15,
              pendingquantity: 0,
              type: "sell",
              status: "cancelled"
          },
          date: new Date(),
          quantity: 5
      }
  ];
  
    
  }
}
