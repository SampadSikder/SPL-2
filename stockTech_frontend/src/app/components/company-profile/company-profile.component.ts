import { Component, OnInit,OnChanges,Input, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MarketDataService } from 'src/app/services/market-data.service';
import { TechnicalIndicatorsService } from 'src/app/services/technical-indicators.service';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import * as crypto from 'crypto-js';
import { HttpClient } from '@angular/common/http';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};
export class news{
  title:string='';
  body:string='';
} 
@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})

export class CompanyProfileComponent implements OnInit, OnChanges {
  isAuthenticated:boolean=false;
  password:string='';
  public lineGraph: Partial<ChartOptions> | any;
  public pieChart: Partial<ChartOptions> | any;
  public pieChart2: Partial<ChartOptions> | any;
  public pieChart3: Partial<ChartOptions> | any;
  y: number[] = Array(3).fill(0);
  dtOptions: DataTables.Settings = {};
  order:Order=new Order();
  newsData: news[]=[];
  code: string = '';
  financialData: any;
  basicData: any;
  graphdata: any;
  graphdata2: any;
  graphdata1: any;
  trading_code: string ='';
  currentDate = new Date();
  currentYear = this.currentDate.getFullYear();
  dateString :string ='';
  myForm!: FormGroup;
  url='http://localhost:4000/api/getWatchlist/';



  constructor(private MarketDataService: MarketDataService,
    private TecIndSer:TechnicalIndicatorsService,
    private newsService: NewsService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private router:Router,
    private location: Location,
    private auth:AuthService,
    private http:HttpClient,
    private port:PortfolioService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.showData();
    this.renderPieChart();
    this.renderPieChart2();
    this.renderDataTable();
    this.receiveNews();
    this.renderPriceGraph();
  }

  ngOnInit(): void {
    this.auth.check1((isAuthenticated) => {
      if (isAuthenticated) {
        this.isAuthenticated=true;
      } else {
        this.isAuthenticated=false;
      }
    });

    this.setYear();
    console.log(this.dateString);
    this.route.params.subscribe((params) => {
      this.code = this.route.snapshot.params['code'];
    });
    console.log(this.code);
    this.showData();
    this.renderPriceGraph();
    this.renderPieChart3();
    this.renderPieChart2();
    this.renderPieChart();
    this.receiveNews();
    
  } 
  setYear(){
    let currentYear = this.currentDate.getFullYear();
    this.currentDate.setFullYear(currentYear-1);
    const year =this.currentDate.getFullYear();
    const month = ('0' + (this.currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + this.currentDate.getDate()).slice(-2);
    this.dateString = `${year}-${month}-${day}`;
  }
  receiveFinance(): Observable<any> {
    return this.MarketDataService.getFinance(this.code);
  }
  showGraph() {
    const currentUrl = this.location.path();
    this.router.navigate([currentUrl, 'graph']);
    }

  getData(): Observable<any> {
    return this.MarketDataService.getProfile(this.code);
  }

  getData1(): Observable<any> {
    return this.MarketDataService.getBullBear(this.code);
  }

  receiveMarketData(): Observable<any> {
    return this.MarketDataService.getMarketData();
  }

  receiveDseIndices(): Observable<any> {
    return this.MarketDataService.getIndices();
  }

  receiveNews(): void {  
    this.newsService.getCompanyNews(this.code,this.dateString).subscribe((data)=>{
          this.newsData = data['news'];
          console.log(this.newsData);       
        });
  }


  showData(): void {
    this.getData()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.basicData = res;
        },
        error: (e) => console.error(e)
      });
  }



  receivePrice(): Observable<any> {
    return this.MarketDataService.getPrice(this.code,this.dateString);
  }


  renderPriceGraph(): void {
    this.receivePrice().subscribe((data1) => {
      const date=data1['date'];
      const open=data1['open'];
      const high=data1['high'];
      const low=data1['low'];
      const close=data1['close'];
      const data = [];
    for (let i = 0; i < date.length; i++) {
      const item = {
        date: parseInt(date[i]),
        open: open[i],
        high: high[i],
        low: low[i],
        close: close[i]
      };
      data.push(item);
    }
    console.log(data);
      this.lineGraph = {
        chart: {
          type: 'candlestick',
          height: '250%',
          width: '90%',
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true,
          },
        },
        series: [{
          data: data.map(item => ({
            x: item.date,
            y: [item.open, item.high, item.low, item.close]
          }))
        }],
        xaxis: {
          type: 'datetime',
          labels: {
            format: 'dd/MM',
          }
        },
        yaxis: 
          {
            labels: {
              formatter: function(value: number) {
                return value.toFixed(2);
              }
            }
          },
      };
      this.lineGraph.render();
    })
  }
 

  renderPieChart(): void {
    this.getData().subscribe ((data)=> {
          const categories = ['Institute', 'Foreign', 'Public','Govt','SponsorDirector'];
          this.graphdata=data;        
          this.pieChart = {
            chart: {
              type: 'pie',
               width: '55%',
            },
            theme: {
              monochrome: {
                enabled: true,
                color: '#255aee',
               
              }
            },
            series:[this.graphdata.Institute,this.graphdata.Foreign, this.graphdata.Public,this.graphdata.Govt,this.graphdata.SponsorDirector], 
           labels: categories,            
          };
          
          this.pieChart.render();
        },
       );
     }


  renderPieChart3(): void {
      this.getData1().subscribe ((data)=> {
            const categories = ['Bull', 'Bear', 'Neutral'];
            this.graphdata1=data;        
            this.pieChart3 = {
              chart: {
                type: 'pie',
                 width: '50%',
              },
              theme: {
                palette: 'palette1' // upto palette10
              },
              
              series:[this.graphdata1.bull,this.graphdata1.bear, this.graphdata1.neutral], 
             labels: categories,            
            };
            this.pieChart3.render();
          },
         );
       }
     renderPieChart2(): void {
      this.getData().subscribe ((data)=> {
        const categories = ['Authorized Capital: '+this.graphdata.AuthorizedCap, 'Paid Up Capital: '+this.graphdata.PaidUpCap];
            
            this.graphdata2=data;
            
            this.pieChart2 = {
              chart: {
                type: 'pie',
                 width: '65%',
             
              },
              theme: {
                palette: 'palette4' // upto palette10
              },
              
              
              series:[this.graphdata.AuthorizedCap,this.graphdata.PaidUpCap],
             labels: categories,            
            };
            this.pieChart2.render();
          }
         );
       }


  renderDataTable(): void {
    this.dtOptions = {
      searching: false,
      ordering:  false,
      
      columnDefs: [
        { width: '90em', targets: 0 },
        { width: '30em', targets: [1, 2, 3, 4, 5] },

      ],
      
      columns: [
        {title: 'Particulars', data: ''},
        {title: '2022', data: '2022'},
        {title: '2021', data: '2021'},
        {title: '2020', data: '2020'},
        {title: '2019', data: '2019'}, 
        {title: '2018', data: '2018'},
      ],
    };
  }

  open(content: any) {
    this.order.tradeCode=this.code;
    this.order.order_type="buy";
    this.order.price=this.basicData.LastTrade;
    const maxprice=this.order.price*1.1;
    const minprice=this.order.price*0.9;
    this.myForm = new FormGroup({
      'price': new FormControl(null, [Validators.required,Validators.min(minprice), Validators.max(maxprice)]),
      'quantity': new FormControl(null, [Validators.required, Validators.min(1), Validators.max(this.basicData.volume)]),
      'password': new FormControl(null, [Validators.required])
    });
		this.modalService.open(content);
	}
  getBalance():Observable<any>{
    const url='http://localhost:4000/api/getBalance/'
    return this.http.post(url,{});
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

  sendWatchlist(){
    this.port.addWatch(this.code).subscribe((data1) => { 
      alert(data1['message']);
    });
}

}
