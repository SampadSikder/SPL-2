import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { company, MarketDataService } from 'src/app/services/market-data.service';
import { ChartOptions } from '../home/home.component';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {

  myForm!: FormGroup;
  public lineGraph: Partial<ChartOptions> | any;
  public pieChart: Partial<ChartOptions> | any;
  public pieChart2: Partial<ChartOptions> | any;
  y: number[] = Array(3).fill(0);
  dtOptions: DataTables.Settings = {};
  newsData: any;
  code: string = '';
  financialData: any;
  basicData: any;
  graphdata: any;
  graphdata2: any;
  trading_code: any;

  constructor(private MarketDataService: MarketDataService,
    private marketdatasservice: MarketDataService,
    private newsService: NewsService,
    private modalService: NgbModal,
    private router: Router,
    route: ActivatedRoute) { 
      
      route.params.subscribe((params) => {
        this.code = params["trading_code"];
      });
    }
    isAuthenticated: boolean=true;


  ngOnInit(): void {


    this.showData();
    this.renderPieChart();
    this.renderPieChart2();
    this.receiveNews();
    this.receiveFinance()
    .subscribe((data) => {
      this.dtOptions.data = data;
      this.financialData=data;
     // console.log(this.financialData);
    });

  } 
  receiveFinance(): Observable<any> {
    return this.MarketDataService.getFinance();
  }


  getData(): Observable<any> {
    return this.marketdatasservice.getProfile();
  }


  receiveMarketData(): Observable<any> {
    return this.MarketDataService.getMarketData();
  }

  receiveDseIndices(): Observable<any> {
    return this.MarketDataService.getIndices();
  }

  receiveNews(): void {  
    this.newsService.getCompanyNews()
      .subscribe({
        next: (res) => {
          this.newsData = res;         
        },
        error: (e) => console.error(e)
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



  renderPieChart(): void {
    this.getData().subscribe ((data)=> {
          const categories = ['Institute', 'Foreign', 'Public', 'Govt', 'SponsorDirector'];
          this.graphdata=data;        
          this.pieChart = {
            chart: {
              type: 'pie',
               width: '60%',
            },
           
            series:[this.graphdata.Institute,this.graphdata.Foreign, this.graphdata.Public,  this.graphdata.Govt,  this.graphdata.SponsorDirector], 
           labels: categories,            
          };
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
                 width: '70%',
              },
              theme: {
                monochrome: {
                  enabled: true
                }
              },
              series:[this.graphdata.AuthorizedCap,this.graphdata.PaidUpCap],
             labels: categories,            
            };
          },
         );
       }



  open(content: any) {
    this.myForm = new FormGroup({
      'price': new FormControl(null, [Validators.required]),
      'quantity': new FormControl(null, [Validators.required, Validators.min(0), Validators.max(this.basicData.volume)])
    });
		this.modalService.open(content);
	}

  makeOrder(){
    
  }

  showGraph() {
    this.router.navigate(["graph"]);
    }

    add(){
      
    }

}
