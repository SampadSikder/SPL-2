import { Component, OnInit } from '@angular/core';
import { Investor } from 'src/app/models/investor.model';
import { Portfolio } from 'src/app/models/portfolio.model';
import { HttpClient } from '@angular/common/http';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { ChartOptions } from '../home/home.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import * as crypto from 'crypto-js';
import { Order } from 'src/app/models/order';
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  myForm!: FormGroup;
  company: Portfolio = new Portfolio();
  order: Order = new Order();
  password:string='';

  constructor(private portfolioService: PortfolioService,
    private modalService: NgbModal,
    private auth:AuthService,
    private http:HttpClient) {}


  list: Portfolio[] = [];
  list2: Portfolio[] = [];
  list3: Portfolio[] = [];
  mergedList: Portfolio[] = [];
  user: Investor = new Investor();
  public pieChart: Partial<ChartOptions> | any;
  isAuthenticated: boolean = true;
  totalProfit: number = 0;

  dtOptions: DataTables.Settings = {};
  dtOptions2: DataTables.Settings = {};
  // dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {

    this.auth.check1((isAuthenticated) => {
      if (isAuthenticated) {
        this.isAuthenticated=true;
      } else {
        this.isAuthenticated=false;
      }
    });
    this.receivePortfolio();

    this.getProfile();
    
    
  }

  getProfile() {
    this.getUser().subscribe((data) => {
      this.user=data['user'];});
  }
  getBalance():Observable<any>{
    const url='http://localhost:4000/api/getBalance/'
    return this.http.post(url,{});
  }

  getUser() {
    const url='http://localhost:4000/api/getUser/';
    return this.http.post<any>(url,{});
  }
  receivePortfolio(){
    this.portfolioService.getPortfolio().subscribe((data)=>{
      this.list=data['list'];
      this.processData();
      this.renderPieChart();
      this.renderTable();
    });
  }
  
  processData(){
    for (const company of this.list) {
      this.totalProfit += company.profit;
      console.log(this.totalProfit);
      console.log(company.profit);
    }
   
    for (const portfolio of this.list) {
      const matchingPortfolio = this.list2.find(p => p.tradeCode === portfolio.tradeCode);
      if (matchingPortfolio) {  
        matchingPortfolio.volumeCumulative += portfolio.volume;
      } else {
        portfolio.volumeCumulative=portfolio.volume;
        this.list2.push({ ...portfolio });
      }
    }

  }
  renderTable() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      searching: false,
      // ordering:false,
      columnDefs: [
        { targets: [1, 2, 3, 4, 5], orderable: false },
        { targets: [0], orderable: true }
      ],
    };

    this.dtOptions2 = {
      pagingType: 'full_numbers',
      searching: false,
    };
    
  }




  renderPieChart(): void {
    this.pieChart = {
      chart: {
        type: 'pie',
        width: '60%',
      },

      series: this.list2.map((d) => d.volumeCumulative),
      labels: this.list2.map((d) => d.tradeCode),
    };
    console.log(this.list2);
    this.pieChart.render();
  }


  getPassword():Observable<any>{
    const url='http://localhost:4000/api/getPassword/'
    return this.http.post(url,{});
  }
  placeOrder():Observable<any>{
    const url='http://localhost:4000/api/takeOrder/'
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
            if(hash!=pass){
              alert("Password doesn't match");}
            else{
              this.placeOrder().subscribe((data2)=>{
                alert(data2['message']);
              });
            }
    
          });
        }
      });
    
  }

  open(content: any, i: number) {
    this.company=this.list2[i];
    this.order.tradeCode=this.company.tradeCode;
    this.order.order_type="sell";
    this.order.price=this.company.LTP;
    const maxprice=this.order.price*1.1;
    const minprice=this.order.price*0.9;
    this.myForm = new FormGroup({
      'price': new FormControl(null, [Validators.required,Validators.min(minprice), Validators.max(maxprice)]),
      'quantity': new FormControl(null, [Validators.required, Validators.min(1), Validators.max(this.company.volumeCumulative)]),
      'password': new FormControl(null, [Validators.required])
    });
		this.modalService.open(content);
  }




}
