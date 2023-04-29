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
  executedList: Transaction[] = [];
  cancelledList: Order[] = [];

  ngOnInit(): void {
    this.getRunningList();
    this.getCancelledList();
    this.getExecutedList();
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
          type: "sell",
          status: "partial"
      }
  ];
  
  }
  getCancelledList() {
    this.cancelledList=[
      {
        orderID: 1,
        bo: "123456789",
        date: new Date(),
        tradeCode: "AAPL",
        price: 150,
        quantity: 10,
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
        type: "sell",
        status: "cancelled"
    },
    {
        orderID: 3,
        bo: "123456789",
        date: new Date(),
        tradeCode: "AAPL",
        price: 160,
        quantity: 15,
        type: "sell",
        status: "cancelled"
    }
    ];
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
              bo: "987654321",
              date: new Date(),
              tradeCode: "GOOG",
              price: 200,
              quantity: 5,
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
              type: "sell",
              status: "cancelled"
          },
          date: new Date(),
          quantity: 5
      }
  ];
  
    
  }

  cancel(order: Order){
    alert("Order "+order.orderID+" is cancellled");
    //remove from db
  }

}


