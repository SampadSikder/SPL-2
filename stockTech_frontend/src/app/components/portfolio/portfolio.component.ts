import { Component, OnInit } from '@angular/core';
import { Investor } from 'src/app/models/investor.model';
import { Portfolio } from 'src/app/models/portfolio.model';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { ChartOptions } from '../home/home.component';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit{
  constructor(private portfolioService: PortfolioService){}
  list: Portfolio[]=[];
  user: Investor=new Investor();
  public pieChart: Partial<ChartOptions> | any;
  totalProfit: number=0;


  ngOnInit(): void {
    this.list=this.portfolioService.getPortfolio();

    this.user.name="Abu Tabu";
    this.user.BO_account_no=123456789012345679n;
    this.user.phone=16276527652864n;
    this.user.email="bsse1216@iit.du.ac.bd";

    for(let company of this.list){
      this.totalProfit+=company.profit;
    }


    this.renderPieChart();
    
  }

  
  renderPieChart(): void {          
          this.pieChart = {
            chart: {
              type: 'pie',
               width: '65%',
            },
          
            series:  this.list.map((d) => d.volume), 
            labels: this.list.map((d) => d.tradeCode),            
          };
     }


     sell(i: number){

     }

}
