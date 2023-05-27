import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order';
@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})

export class OrderHistoryComponent implements OnInit{
  constructor(private http:HttpClient,private auth:AuthService){}
  isAuthenticated: boolean = false;
  ngOnInit(): void {
    this.auth.check1((isAuthenticated) => {
      if (isAuthenticated) {
        this.isAuthenticated=true;
      } else {
        this.isAuthenticated=false;
      }
    });
   this.getOrderList();
   this.getPastOrderList();
  }
  orderList:Order[]=[];
  orderList1:Order[]=[];
  
fetchPendingOrders(){
  const baseUrl='http://localhost:4000/api/getPending/'; 
    return this.http.post<any>(baseUrl,{});
}
fetchPastOrders(){
  const baseUrl='http://localhost:4000/api/getPast/'; 
    return this.http.post<any>(baseUrl,{});
}

cancelOrder(oid:string){
  const baseUrl='http://localhost:4000/api/cancelOrder/'; 
    return this.http.post<any>(baseUrl,{id:oid});
}

cancel(oid:string) {
  this.cancelOrder(oid).subscribe((data)=>{
    alert(data['message']);
    window.location.reload();
  });
}
 getOrderList() {
  this.fetchPendingOrders().subscribe((data)=>{
    this.orderList=data['pendings'];
  });
}

getPastOrderList() {
  this.fetchPastOrders().subscribe((data)=>{
    this.orderList1=data['past'];
  });
}

}


