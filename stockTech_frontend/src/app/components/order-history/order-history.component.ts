import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
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
   
    if (confirm('Are you sure you want to cancel order '+order.orderID+'?')) {
      alert("Order "+order.orderID+" is cancellled");
      // User clicked "OK", so proceed with the delete action
      //remove from db
    } else {
      // User clicked "Cancel", so do nothing
      alert("Order "+order.orderID+" is not cancellled");
    }
    
    
  }

}


