import { Component, OnInit } from '@angular/core';
import { Order, Transaction } from 'src/app/models/order.model';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  isAuthenticated: boolean = true;
  runningList: Order[] = [];

  notRunningList: Order[] = [];

  ngOnInit(): void {
    this.getRunningList();
    this.getNotRunningList();
    
  }


  getRunningList() {
    this.runningList = [
      {
          orderID: 1,
          bo: "123456789",
          date: new Date(),
          tradeCode: "AAPL",
          price: 150,
          quantity: 10,
          pendingquantity: 10,
          type: "buy",
          status: "pending"
      },
      {
          orderID: 2,
          bo: "987654321",
          date: new Date(),
          tradeCode: "GOOG",
          price: 200,
          quantity: 5,
          pendingquantity:2,
          type: "sell",
          status: "partial"
      },
      {
          orderID: 3,
          bo: "123456789",
          date: new Date(),
          tradeCode: "AAPL",
          price: 160,
          quantity: 15,
          pendingquantity: 10,
          type: "sell",
          status: "partial"
      }
  ];
  
  }
  getNotRunningList() {
    this.notRunningList=[
      {
        orderID: 1,
        bo: "123456789",
        date: new Date(),
        tradeCode: "AAPL",
        price: 150,
        quantity: 10,
        pendingquantity: 10,
        type: "buy",
        status: "cancelled"
    },
    {
        orderID: 2,
        bo: "987654321",
        date: new Date(),
        tradeCode: "GOOG",
        price: 200,
        quantity: 5,
        pendingquantity: 10,
        type: "sell",
        status: "executed"
    },
    {
        orderID: 3,
        bo: "123456789",
        date: new Date(),
        tradeCode: "AAPL",
        price: 160,
        quantity: 15,
        pendingquantity: 10,
        type: "sell",
        status: "cancelled"
    }
    ];
  }
  

  cancel(order: Order){
    alert("Order "+order.orderID+" is cancellled");
    //remove from db
  }

}


