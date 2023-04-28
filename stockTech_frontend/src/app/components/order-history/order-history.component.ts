import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit{
  isAuthenticated: boolean = true;
  orderList: Order[]= [];

  ngOnInit(): void {
   this.getOrderList();
  }
 
  
 getOrderList() {
  throw new Error('Function not implemented.');
}

}


