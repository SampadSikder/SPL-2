import { Component, OnInit } from '@angular/core';
import { IPO,appliedIPO } from 'src/app/models/ipo.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Order } from 'src/app/models/order';
import * as crypto from 'crypto-js';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-ipo',
  templateUrl: './ipo.component.html',
  styleUrls: ['./ipo.component.css']
})
export class IPOComponent implements OnInit{
  myForm!: FormGroup;
  isAuthenticated: boolean = false;
  order:Order=new Order();
  constructor(private http:HttpClient, private modalService: NgbModal,private auth:AuthService) {}
  password:string='';
  list: IPO[]=[];
  list2: appliedIPO[]=[];
  

  ngOnInit(): void {
    this.auth.check1((isAuthenticated) => {
      if (isAuthenticated) {
        this.isAuthenticated=true;
      } else {
        this.isAuthenticated=false;
      }
    });
    this.getList();
    this.getHistory();
  }

  getHistory() {
    this.getAppliedIPO().subscribe((data)=>{
      this.list2=data['ipo'];
    });
  }
  getList() {
    this.getIPO().subscribe((data)=>{
      this.list=data['ipo'];
    });
  }

  open(content: any, i: number) {
    this.order.tradeCode=this.list[i].code;
    this.order.order_type="ipo";
    this.order.price=this.list[i].price;
    this.myForm = new FormGroup({
      'quantity': new FormControl(null, [Validators.required, Validators.min(1)]),
      'password': new FormControl(null, [Validators.required])
    }); 
    this.modalService.open(content);
  }

  getBalance():Observable<any>{
    const url='http://localhost:4000/api/getBalance/'
    return this.http.post(url,{});
  }
  getIPO():Observable<any>{
    const url='http://localhost:4000/api/getIPO/'
    return this.http.post(url,{});
  }
  getAppliedIPO():Observable<any>{
    const url='http://localhost:4000/api/getAppliedIPO/'
    return this.http.post(url,{});
  }
  getPassword():Observable<any>{
    const url='http://localhost:4000/api/getPassword/'
    return this.http.post(url,{});
  }
  placeOrder():Observable<any>{
    const url='http://localhost:4000/api/takeIPOOrder/'
    return this.http.post(url,{type:this.order.order_type,code:this.order.tradeCode,price:this.order.price,quantity:this.order.quantity});
  }
  makeOrder(){
      const total=this.order.price*this.order.quantity*1.004;
      
      this.getBalance().subscribe((data)=>{
        const balance=data['balance'];
        if(total>balance){
          alert("Insufficient Balance");
        }
        else{
          this.getPassword().subscribe((data1)=>{
            let hash = crypto.SHA256(this.password).toString();
            const pass=data1['password'];
            if(hash!=pass){alert("Password doesn't match");}
            else{
              this.placeOrder().subscribe((data2)=>{
                alert(data2['message']);
              });
            }
    
          });
        }
      });
    
  }
}
