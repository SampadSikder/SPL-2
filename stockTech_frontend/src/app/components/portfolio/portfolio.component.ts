import { Component, OnInit } from '@angular/core';
import { Investor } from 'src/app/models/investor.model';
import { Portfolio } from 'src/app/models/portfolio.model';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { ChartOptions } from '../home/home.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  myForm!: FormGroup;
  company: Portfolio = new Portfolio();
  order: Portfolio = new Portfolio();

  constructor(private portfolioService: PortfolioService,
    private modalService: NgbModal,) {}


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

    console.log(this.isAuthenticated);
    this.list = this.portfolioService.getPortfolio();


    this.user.name = "Abu Tabu";
    this.user.BO_account_no = 123456789012345679n;
    this.user.phone = 16276527652864n;
    this.user.email = "bsse1216@iit.du.ac.bd";


    for (let company of this.list) {
      this.totalProfit += company.profit;
    }

    // const tradeCodes = ['AAPL', 'GOOG', 'MSFT', 'AAPL', 'GOOG'];
    // const uniqueTradeCodes = [...new Set(tradeCodes)];
    // console.log(uniqueTradeCodes); // ['AAPL', 'GOOG', 'MSFT']

   
    for (const portfolio of this.list) {
      const matchingPortfolio = this.list2.find(p => p.tradeCode === portfolio.tradeCode);
      if (matchingPortfolio) {      
        matchingPortfolio.volumeCumulative += portfolio.volumeCumulative;
       
      } else {
        this.list2.push({ ...portfolio });
      }
    }

    this.renderPieChart();
    this.renderTable();
 
    // this.processData();
  
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
        width: '65%',
      },

      series: this.list2.map((d) => d.volumeCumulative),
      labels: this.list2.map((d) => d.tradeCode),
    };
  }


  sell() {

  }

  open(content: any, i: number) {
    this.company = this.list[i];
    this.myForm = new FormGroup({
      'price': new FormControl(null, [Validators.required]),
      'quantity': new FormControl(null, [Validators.required, Validators.min(0), Validators.max(this.company.volume)])
    });
    this.modalService.open(content);
  }




}
